// library imports
import { useContext, createContext, useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { AvatarGenerator } from "random-avatar-generator"

// imports from files
import { auth, db } from "../config/firebase"
import FullPageSpinner from "../components/FullPageSpinner"

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const generator = new AvatarGenerator()

    const createUser = (email, password, username) => {
        createUserWithEmailAndPassword(auth, email, password).then(
            (newUser) => {
                setDoc(doc(db, "user", newUser.user.uid), {
                    username,
                    avatar:
                        generator.generateRandomAvatar(newUser.user.uid) || "",
                    isAdmin: false,
                    disabled: false,
                    createdAt: serverTimestamp(),
                }).then((res) => {
                    return newUser
                })
            }
        )
    }

    const verifyAccount = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logIn = (email, password) => {
        // TODO: login with username
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userSnap = await getDoc(doc(db, "user", user.uid))
                    setCurrentUser({
                        id: user.uid,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        ...userSnap.data(),
                    })
                } catch (error) {
                    // TODO: handle error if cannot get user from db
                    console.log(error)
                }
            } else setCurrentUser(null)
            setLoading(false)
        })
        return unsubscribe
        //eslint-disable-next-line
    }, [])

    const value = {
        currentUser,
        createUser,
        verifyAccount,
        resetPassword,
        logIn,
        logOut,
    }

    if (loading) return <FullPageSpinner />

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

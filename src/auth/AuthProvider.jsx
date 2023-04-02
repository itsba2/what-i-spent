// library imports
import { useContext, createContext, useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    deleteUser,
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth"
import {
    getDoc,
    doc,
    setDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore"

// imports from files
import { auth, db } from "../firebase/config"
// import FullPageSpinner from "../components/FullPageSpinner"

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const createUser = async (email, password, username) => {
        const newUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        await setDoc(doc(db, "user", newUser.user.uid), {
            username,
            isAdmin: false,
            currencyPref: "EUR",
            createdAt: serverTimestamp(),
        })
        return newUser
    }

    const verifyAccount = async () => {
        return await sendEmailVerification(auth.currentUser)
    }

    const resetPassword = async (email) => {
        return await sendPasswordResetEmail(auth, email)
    }

    const logIn = async (email, password) => {
        // TODO: login with username
        return await signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = async () => {
        return await signOut(auth)
    }

    const updateUserEmail = async (currentPassword, newEmail) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        )
        await reauthenticateWithCredential(auth.currentUser, credential)
        return await updateEmail(auth.currentUser, newEmail)
    }

    const updateUsername = async (currentPassword, newUsername) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        )
        await reauthenticateWithCredential(auth.currentUser, credential)
        await updateDoc(doc(db, "user", auth.currentUser.uid), {
            username: newUsername,
        })
        return auth.currentUser.reload()
    }

    const updateUserPassword = async (currentPassword, newPassword) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        )
        await reauthenticateWithCredential(auth.currentUser, credential)
        return await updatePassword(auth.currentUser, newPassword)
    }

    const deleteAccount = async (currentPassword) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        )
        await reauthenticateWithCredential(auth.currentUser, credential)
        return await deleteUser(auth.currentUser)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userSnap = await getDoc(doc(db, "user", user.uid))
                    const { expenses, earnings, ...userData } = userSnap.data()
                    setCurrentUser({
                        id: user.uid,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        ...userData,
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
        updateUserEmail,
        updateUsername,
        updateUserPassword,
        deleteAccount,
    }

    // if (loading) return <FullPageSpinner />

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

// Firebase - Expense functions
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore"
import { db } from "./config"

export const fetchExpenses = async (userId) => {
    try {
        let user
        const userSnap = await getDoc(doc(db, "user", userId))
        if (!userSnap.exists()) {
            return { msg: "No user record has been found."}
        }
        user = userSnap.data()
        const expenseQuery = query(
            collection(db, "expense"),
            where(documentId(), "in", user.expenses)
        )
        const userExpensesSnap = await getDocs(expenseQuery)
        return userExpensesSnap.docs.map((doc) => ({
            ...doc.data(),
            date: doc.data().date.seconds,
        }))
    } catch (error) {
        return error
    }
}

export const addTransaction = async (
    userId,
    type,
    category,
    title,
    desc,
    amount,
    currency,
    date
) => {
    try {
        let newTransaction
        if (type === "expense") {
            newTransaction = await addDoc(collection(db, "expense"), {
                userId,
                category,
                title,
                desc,
                amount,
                currency,
                date,
            })
            await updateDoc(doc(db, "user", userId), {
                expenses: arrayUnion(newTransaction.id),
            })
        } else if (type === "earning") {
            newTransaction = await addDoc(collection(db, "earning"), {
                userId,
                category,
                title,
                desc,
                amount,
                currency,
                date,
            })
            await updateDoc(doc(db, "user", userId), {
                earnings: arrayUnion(newTransaction.id),
            })
        }
        return { msg: "Successfully added." }
    } catch (error) {
        return error
    }
}

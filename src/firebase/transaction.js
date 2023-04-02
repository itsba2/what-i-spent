// Firebase - Expense functions
import {
    addDoc,
    arrayUnion,
    arrayRemove,
    collection,
    deleteDoc,
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
        const userSnap = await getDoc(doc(db, "user", userId))
        if (!userSnap.exists()) {
            return { msg: "No user record has been found." }
        }
        const user = userSnap.data()
        const expenseQuery = query(
            collection(db, "expense"),
            where(documentId(), "in", user.expenses)
        )
        const userExpensesSnap = await getDocs(expenseQuery)
        return userExpensesSnap.docs.map((doc) => ({
            type: "expense",
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.seconds,
        }))
    } catch (error) {
        return error.code
    }
}
export const fetchEarnings = async (userId) => {
    try {
        const userSnap = await getDoc(doc(db, "user", userId))
        if (!userSnap.exists()) {
            return { msg: "No user record has been found." }
        }
        const user = userSnap.data()
        const earningQuery = query(
            collection(db, "earning"),
            where(documentId(), "in", user.earnings)
        )
        const userEarningsSnap = await getDocs(earningQuery)
        return userEarningsSnap.docs.map((doc) => ({
            type: "expense",
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.seconds,
        }))
    } catch (error) {
        return error.code
    }
}

export const addExpense = async ({
    userId,
    category,
    title,
    desc,
    amount,
    currency,
    date,
}) => {
    try {
        const newExpense = await addDoc(collection(db, "expense"), {
            userId,
            category,
            title,
            desc,
            amount,
            currency,
            date,
        })
        await updateDoc(doc(db, "user", userId), {
            expenses: arrayUnion(newExpense.id),
        })

        return { docId: newExpense.id, msg: "Successfully added." }
    } catch (error) {
        return error.code
    }
}

export const addEarning = async ({
    userId,
    category,
    title,
    desc,
    amount,
    currency,
    date,
}) => {
    try {
        const newEarning = await addDoc(collection(db, "earning"), {
            userId,
            category,
            title,
            desc,
            amount,
            currency,
            date,
        })
        await updateDoc(doc(db, "user", userId), {
            earnings: arrayUnion(newEarning.id),
        })

        return { docId: newEarning.id, msg: "Successfully added." }
    } catch (error) {
        return error.code
    }
}

export const deleteExpense = async ({ userId, docId }) => {
    try {
        await updateDoc(doc(db, "user", userId), {
            expenses: arrayRemove(docId),
        })
        await deleteDoc(doc(db, "expense", docId))
        return { msg: "Successfully deleted." }
    } catch (error) {
        return error.code
    }
}

export const deleteEarning = async (docId) => {
    try {
        await updateDoc(doc(db, "user", userId), {
            earnings: arrayRemove(docId),
        })
        await deleteDoc(doc(db, "earning", docId))
        return { msg: "Successfully deleted." }
    } catch (error) {
        return error.code
    }
}

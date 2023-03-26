// Firebase - Expense functions
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    updateDoc,
} from "firebase/firestore"
import { db } from "./config"

export const getTransactions = (id) => {
    // TODO: get user's all expenses
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

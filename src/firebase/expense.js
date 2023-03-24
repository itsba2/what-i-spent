// Firebase - Expense functions
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    updateDoc,
} from "firebase/firestore"
import { db } from "./config"

export const getUserExpenses = (id) => {
    // TODO: get user's all expenses
}

export const addExpense = async (
    userId,
    category,
    title,
    desc,
    amount,
    currency,
    date
) => {
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
        return { msg: "Successfully added." }
    } catch (error) {
        return error
    }
}

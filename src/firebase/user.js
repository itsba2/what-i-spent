import { db } from "./config"
import { updateDoc, doc } from "firebase/firestore"

export const updateCurrencyPref = async (userId, pref) => {
    try {
        await updateDoc(doc(db, "user", userId), {
            currencyPref: pref,
        })
        return { msg: `New currency preference: ${pref}` }
    } catch (error) {
        return error.code
    }
}

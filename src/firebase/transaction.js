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
  setDoc,
} from "firebase/firestore";
import { db } from "./config";
import { chunkArray } from "../helpers/helpers";

export const fetchExpenses = async (userId) => {
  try {
    const userSnap = await getDoc(doc(db, "user", userId));
    if (!userSnap.exists()) {
      return { msg: "No user record has been found." };
    }
    const userExpensesChunks = chunkArray(userSnap.data().expenses, 10);
    let expenseData = [];
    for await (const expenses of userExpensesChunks.map(async (chunk) => {
      let expenseSnapshots = await getDocs(
        query(collection(db, "expense"), where(documentId(), "in", chunk))
      );
      return expenseSnapshots.docs;
    })) {
      expenses.forEach((expense) => {
        expenseData.push({
          type: "expense",
          id: expense.id,
          ...expense.data(),
          date: expense.data().date.seconds,
        });
      });
    }

    return expenseData;
  } catch (error) {
    return error.code;
  }
};
export const fetchEarnings = async (userId) => {
  try {
    const userSnap = await getDoc(doc(db, "user", userId));
    if (!userSnap.exists()) {
      return { msg: "No user record has been found." };
    }
    const userEarningsChunks = chunkArray(userSnap.data().earnings, 10);
    let earningData = [];
    for await (const earnings of userEarningsChunks.map(async (chunk) => {
      let earningSnapshots = await getDocs(
        query(collection(db, "earning"), where(documentId(), "in", chunk))
      );
      return earningSnapshots.docs;
    })) {
      earnings.forEach((earning) => {
        earningData.push({
          type: "earning",
          id: earning.id,
          ...earning.data(),
          date: earning.data().date.seconds,
        });
      });
    }

    return earningData;
  } catch (error) {
    return error.code;
  }
};

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
    });
    await updateDoc(doc(db, "user", userId), {
      expenses: arrayUnion(newExpense.id),
    });

    return { docId: newExpense.id, msg: "Successfully added." };
  } catch (error) {
    return error.code;
  }
};

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
    });
    await updateDoc(doc(db, "user", userId), {
      earnings: arrayUnion(newEarning.id),
    });

    return { docId: newEarning.id, msg: "Successfully added." };
  } catch (error) {
    return error.code;
  }
};

export const deleteExpense = async ({ userId, docId }) => {
  try {
    await updateDoc(doc(db, "user", userId), {
      expenses: arrayRemove(docId),
    });
    await deleteDoc(doc(db, "expense", docId));
    return { msg: "Successfully deleted." };
  } catch (error) {
    return error.code;
  }
};

export const deleteEarning = async (docId) => {
  try {
    await updateDoc(doc(db, "user", userId), {
      earnings: arrayRemove(docId),
    });
    await deleteDoc(doc(db, "earning", docId));
    return { msg: "Successfully deleted." };
  } catch (error) {
    return error.code;
  }
};

export const updateExpense = async ({
  userId,
  docId,
  type,
  category,
  title,
  desc,
  amount,
  currency,
  date,
}) => {
  try {
    const userSnap = await getDoc(doc(db, "user", userId));
    if (!userSnap.exists()) {
      return { msg: "No user record has been found." };
    }
    if (type === "earning" && userSnap.data().expenses.includes(docId)) {
      await updateDoc(doc(db, "user", userId), {
        expenses: arrayRemove(docId),
        earnings: arrayUnion(docId),
      });
      await deleteDoc(doc(db, "expense", docId));
      await setDoc(doc(db, "earning", docId), {
        userId,
        category,
        title,
        desc,
        amount,
        currency,
        date,
      });
    } else {
      await updateDoc(doc(db, "expense", docId), {
        category,
        title,
        desc,
        amount,
        currency,
        date,
      });
    }
    return { msg: "Successfully updated." };
  } catch (error) {
    return error.code;
  }
};

export const updateEarning = async ({
  userId,
  docId,
  type,
  category,
  title,
  desc,
  amount,
  currency,
  date,
}) => {
  try {
    const userSnap = await getDoc(doc(db, "user", userId));
    if (!userSnap.exists()) {
      return { msg: "No user record has been found." };
    }
    if (type === "expense" && userSnap.data().earnings.includes(docId)) {
      await updateDoc(doc(db, "user", userId), {
        earnings: arrayRemove(docId),
        expenses: arrayUnion(docId),
      });
      await deleteDoc(doc(db, "earning", docId));
      await setDoc(doc(db, "expense", docId), {
        userId,
        category,
        title,
        desc,
        amount,
        currency,
        date,
      });
    } else {
      await updateDoc(doc(db, "earning", docId), {
        category,
        title,
        desc,
        amount,
        currency,
        date,
      });
    }
    return { msg: "Successfully updated." };
  } catch (error) {
    return error.code;
  }
};

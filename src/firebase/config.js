// library imports
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// config file
const firebaseConfig =
  import.meta.env.VITE_ENV === "dev"
    ? {
        apiKey: "AIzaSyA2ZvQZedeXnGtdeZqWzdiFUbNG_UsbVoY",
        authDomain: "wis-test-20031.firebaseapp.com",
        projectId: "wis-test-20031",
        storageBucket: "wis-test-20031.appspot.com",
        messagingSenderId: "752926918004",
        appId: "1:752926918004:web:78a3839e777deacbcd9821",
        measurementId: "G-NVCB9CZBRK",
      }
    : {
        apiKey: "AIzaSyDzSzYAs4Z_zIxdFFwo-adkZWgqkcaKXVE",
        authDomain: "what-i-spent.firebaseapp.com",
        projectId: "what-i-spent",
        storageBucket: "what-i-spent.appspot.com",
        messagingSenderId: "1021455023570",
        appId: "1:1021455023570:web:b1d09acd3fe3c28f755c0b",
        measurementId: "G-XMC8VT03G8",
      };

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };

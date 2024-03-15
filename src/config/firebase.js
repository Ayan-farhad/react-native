import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqq76O95ub9ccRqQjAm3Oe5dtsYVBUXy8",
    authDomain: "rideapp-10186.firebaseapp.com",
    projectId: "rideapp-10186",
    storageBucket: "rideapp-10186.appspot.com",
    messagingSenderId: "855920801506",
    appId: "1:855920801506:web:5fbf5f38c5b9e50480d0bb"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

async function riderRequest(riderRequest) {
    await addDoc(collection(db, "rides"), riderRequest);
}

export default riderRequest;
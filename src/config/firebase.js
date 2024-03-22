import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

async function riderRequest(riderRequest) {
  try {
    await addDoc(collection(db, "rides"), riderRequest);
    console.log("Rider request added successfully.");
  } catch (error) {
    console.error("Error adding rider request: ", error);
  }
}

async function signUp(email, password, fullname) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addDoc(collection(db, 'users'), {
      fullname,
      age,
      email
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // Handle errors
    console.error(errorCode, errorMessage);
    alert(errorMessage); // You might want to show the error message to the user
  }
}

async function signIn(email, password, fullname) {
  signInWithEmailAndPassword(auth, email, password, fullname)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
export { riderRequest, signUp, signIn };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeIklgTeCzxdlfXePR6Mc_BMDKtLZgKks",
  authDomain: "chat-project-79177.firebaseapp.com",
  projectId: "chat-project-79177",
  storageBucket: "chat-project-79177.appspot.com",
  messagingSenderId: "1004215727122",
  appId: "1:1004215727122:web:343f99908cc48aa4b5d4cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmeyi aktif
export const auth = getAuth(app);

// google yetkilendirmesi için kurulum
export const provider = new GoogleAuthProvider();

// veritabanının referansını oluşturma
export const db = getFirestore(app);

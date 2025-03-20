// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiZAwYi6ArQHS-iaCn5ebj1yTNUEIHR_4",
  authDomain: "twitterclone-3774a.firebaseapp.com",
  projectId: "twitterclone-3774a",
  storageBucket: "twitterclone-3774a.firebasestorage.app",
  messagingSenderId: "430997793120",
  appId: "1:430997793120:web:288c6bdcfe0a060f941605",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! yetkilendirme kurulumu
export const auth = getAuth(app);

// Google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

// veritabanının referansını alma
export const db = getFirestore(app);

// medya'ları depolayacağımız yer
export const storage = getStorage(app);

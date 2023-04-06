// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2BE1YdCpYqOTF7f3GH83qHMSnTn9NVyQ",
    authDomain: "tech-blogs-9511e.firebaseapp.com",
    projectId: "tech-blogs-9511e",
    storageBucket: "tech-blogs-9511e.appspot.com",
    messagingSenderId: "520791966780",
    appId: "1:520791966780:web:b401f66be31be5e9752f39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;

const storage = getStorage(app);
export {storage};
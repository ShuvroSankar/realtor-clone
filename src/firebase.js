// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQ9Nj97tm8MCGZwOENaSMazKroimiA3cw",
    authDomain: "realtor-clone-react-e4451.firebaseapp.com",
    projectId: "realtor-clone-react-e4451",
    storageBucket: "realtor-clone-react-e4451.appspot.com",
    messagingSenderId: "362556839519",
    appId: "1:362556839519:web:29cd0781390f54aa0e6dea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
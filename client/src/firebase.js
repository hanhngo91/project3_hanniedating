// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzFMdmAqi1YPBIeHEZcVo-t3Majk-gY0A",
  authDomain: "hannie-dating-app-md03.firebaseapp.com",
  projectId: "hannie-dating-app-md03",
  storageBucket: "hannie-dating-app-md03.appspot.com",
  messagingSenderId: "508082834506",
  appId: "1:508082834506:web:98002764be6b1cf71d2ab3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

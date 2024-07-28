// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBqx4UHIip0h7xe8gBWPdzmGZXh_ACOdUw",
	authDomain: "clone-19a5a.firebaseapp.com",
	projectId: "clone-19a5a",
	storageBucket: "clone-19a5a.appspot.com",
	messagingSenderId: "996813256214",
	appId: "1:996813256214:web:89fb43b4753b13833a6737",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

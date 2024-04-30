// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
require('dotenv').config();


//const firebaseConfig = process.env.FB_CONFIG;
const firebaseConfig = JSON.parse(process.env.FB_CONFIG || "");

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };

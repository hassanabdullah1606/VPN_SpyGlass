import dotenv from 'dotenv';
dotenv.config();
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
console.log("import sucessfull")
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain:  process.env.FB_AUTH_DOMAIN,
  projectId:  process.env.FB_PROJECT_ID,
  storageBucket:  process.env.FB_STORAGE_BUCKET,
  messagingSenderId:  process.env.FB_MESSAGING_SENDER_ID,
  appId:  process.env.FB_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };

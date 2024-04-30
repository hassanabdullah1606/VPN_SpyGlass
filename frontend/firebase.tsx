import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

console.log("Import successful");

const firebaseConfig = {
  apiKey: "AIzaSyCoxCiVQ88B6doo9ze7ZcF_CaMF4IvbUAE",
  authDomain: "fir-auth-2b42c.firebaseapp.com",
  projectId: "fir-auth-2b42c",
  storageBucket: "fir-auth-2b42c.appspot.com",
  messagingSenderId: "745020437439",
  appId: "1:745020437439:web:36e7b87097d95d0c5ae70a"
}

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };



// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCvjWecDAxsWURynvdW4JS532PBPjaIxa4',
  authDomain: 'vpnspyglass.firebaseapp.com',
  projectId: 'vpnspyglass',
  storageBucket: 'vpnspyglass.appspot.com',
  messagingSenderId: '372693459736',
  appId: '1:372693459736:web:04cc9620431e6eb575f46d',
  measurementId: 'G-BWV7082X3N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };

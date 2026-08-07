// Firebase configuration
// Replace these values with your actual Firebase config
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "your-api-key-here", // Replace with your actual API key
  authDomain: "idyll-productions-videos.firebaseapp.com",
  projectId: "idyll-productions-videos",
  storageBucket: "idyll-productions-videos.firebasestorage.app",
  messagingSenderId: "your-sender-id", // Replace with your actual sender ID
  appId: "your-app-id" // Replace with your actual app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
export default app;
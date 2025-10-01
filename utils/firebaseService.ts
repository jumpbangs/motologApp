/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { doc, getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

let app: FirebaseApp;
let firebaseAuth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  firebaseAuth = getAuth();
}

const firebaseDb = getFirestore(app);

export { app, firebaseAuth, firebaseDb };

export const userDocRef = (uid: string) => {
  return doc(firebaseDb, 'users', uid);
};

export const fuelLogDocRef = (uid: string) => {
  return doc(firebaseDb, 'fuelLog', uid);
};

// Error mapping (unchanged)
const AuthErrorsCodes: { [key: string]: string } = {
  'auth/invalid-req-type': 'Invalid request type',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/internal-error': 'An internal AuthError has occurred.',
  'auth/email-already-in-use': 'The email address is already in use by another account.',
};

export const getAuthErrorMessage = (code: string): string => {
  if (AuthErrorsCodes[code]) {
    return AuthErrorsCodes[code];
  } else {
    console.warn(code);
    return 'An unknown authentication error occurred';
  }
};

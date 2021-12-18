// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyD1hpOWOOzQ8fMFAC7ygIQz1Bw27U0Sb20',
  authDomain: 'movie-web-3c5af.firebaseapp.com',
  projectId: 'movie-web-3c5af',
  storageBucket: 'movie-web-3c5af.appspot.com',
  messagingSenderId: '239485034256',
  appId: '1:239485034256:web:cb11dbb1e3bc823d808f95',
});

export const auth = app.auth();
export default app;

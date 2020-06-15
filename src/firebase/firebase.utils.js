import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDPfeVI3j5n4hr0dVe6cF1vEdYUgrSvK_8",
  authDomain: "crwn-db-c494f.firebaseapp.com",
  databaseURL: "https://crwn-db-c494f.firebaseio.com",
  projectId: "crwn-db-c494f",
  storageBucket: "crwn-db-c494f.appspot.com",
  messagingSenderId: "588736367381",
  appId: "1:588736367381:web:6de61291f3676615cf371c"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
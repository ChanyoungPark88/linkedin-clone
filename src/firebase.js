import { initializeApp } from '@firebase/app';
import { signInWithPopup, getAuth, GoogleAuthProvider } from '@firebase/auth';
import { getStorage } from '@firebase/storage';
import { getDatabase } from 'firebase/database';

import { SET_USER } from './actions/actionType';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFU8Lxmhg86tjZU3gdK3QOdhNFHhue0Rc',
  authDomain: 'linkedin-clone-65d75.firebaseapp.com',
  projectId: 'linkedin-clone-65d75',
  storageBucket: 'linkedin-clone-65d75.appspot.com',
  messagingSenderId: '764855500949',
  appId: '1:764855500949:web:79ac75fe3f4a76d9b4db9c',
  measurementId: 'G-D8RHMZBY41',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage();

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export function signInAPI() {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((payload) => {
        console.log(payload.user);
        dispatch(setUser(payload.user));
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signOutAPI() {
  return (dispatch) => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
export { storage };
export default db;

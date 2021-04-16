import firebase from "firebase"
import "firebase/firebase-storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mindx-images-6bcad.firebaseapp.com",
  projectId: "mindx-images-6bcad",
  storageBucket: "mindx-images-6bcad.appspot.com",
  messagingSenderId: "1043227411244",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export default storage

import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAaFoR8HSHimBQRSZcxGm8aqPyhviPkjys",
  authDomain: "olx-clone-53d21.firebaseapp.com",
  projectId: "olx-clone-53d21",
  storageBucket: "olx-clone-53d21.appspot.com",
  messagingSenderId: "995715100384",
  appId: "1:995715100384:web:d6aece4b0851305fd3ea85",
  measurementId: "G-9P54MT1TR5",
};

export default firebase.initializeApp(firebaseConfig);

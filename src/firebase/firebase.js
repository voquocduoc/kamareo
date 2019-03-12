import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const prodConfig = {
  apiKey: "AIzaSyCpjj7htGVx0CIkVkuIJydKxNA37pc2dcM",
  authDomain: "voquocduoc-1991.firebaseapp.com",
  databaseURL: "https://voquocduoc-1991.firebaseio.com",
  projectId: "voquocduoc-1991",
  storageBucket: "voquocduoc-1991.appspot.com",
  messagingSenderId: "737831086497"
};

// firebase auth
firebase.initializeApp(prodConfig);
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  db,
  auth,
  storage
};

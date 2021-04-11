import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAadwfzmrhcw0IOcjhPNERZwyuo9cuKc0o",
  authDomain: "whatsapp-2-1363a.firebaseapp.com",
  projectId: "whatsapp-2-1363a",
  storageBucket: "whatsapp-2-1363a.appspot.com",
  messagingSenderId: "992028294821",
  appId: "1:992028294821:web:dbc87d10fb4f9319e4574c"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

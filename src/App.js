import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import Channel from "./component/Channel";
import "./App.css";
//firebase config......
firebase.initializeApp({
  apiKey: "AIzaSyDvfmSQ_JOenEhtbMzBbPBCxOOIs5Ps4_0",
  authDomain: "chatez-85f53.firebaseapp.com",
  projectId: "chatez-85f53",
  storageBucket: "chatez-85f53.appspot.com",
  messagingSenderId: "357520577785",
  appId: "1:357520577785:web:6a8b0c1ba6f70e3040fe28",
});
//
const auth = firebase.auth();

//db...
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);

  const [initializing, setInitializing] = useState("true");
  useEffect(() => {
    //this willl return a function
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //already logged in
        setUser(user);
      } else {
        //not logged in
        setUser(null);
      }
      if (initializing) {
        //loading
        setInitializing(false);
      }
    });
    //cleanup
    return unsubscribe;
  }, []);

  //a simple signing in with google using firebase
  const signInGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider(); //getting google provider object

    auth.useDeviceLanguage(); //setting language to default browser preference

    try {
      //starting with G-login
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.error(err);
    }
  };
  const signOutGoogle = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.error(err);
    }
  };

  if (initializing) return "Loading...";
  return (
    <div className="App">
      {user ? (
        <div>
          <Channel user={user} db={db} />
          <button onClick={signOutGoogle}>SignOut</button>
        </div>
      ) : (
        <button onClick={signInGoogle}>SignIn With Google </button>
      )}
    </div>
  );
}

export default App;

// Site link: https://auth-repack.firebaseapp.com/
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [users, setUsers] = useState({});
  const { displayName, email, photoURL } = users;

  // Google Sign In Func
  // -----------------------
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        const credential = result.credential;
        const accessToken = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // console.log('Sign In Google User Props', user);
        setUsers(user);
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  }


  // Facebook Sign In Func
  // --------------------------
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleFacebookSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider)
      .then((result) => {
        const credential = result.credential;
        const accessToken = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // console.log('Sign In Facebook User Props', user);
        setUsers(user);
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  }


  // Github Sign In Func
  // -------------------------
  const githubProvider = new firebase.auth.GithubAuthProvider();
  const handleGithubSignIn = () => {
    firebase.auth().signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        console.log('Sign In Github User Props', user);
        setUsers(user);
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div className="App">
      <h1>Google Firebase Authentication</h1>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
      <button onClick={handleGithubSignIn}>Github Sign In</button>
      <div>
        <img src={photoURL} alt="" style={{ marginTop: '10px' }} />
        <h3>Name: {displayName}</h3>
        <h4>Email: {email}</h4>
      </div>
    </div>
  );
}

export default App;

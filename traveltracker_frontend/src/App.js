import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import React, {useState} from "react";
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import awsExports from "./aws-exports";
import { AmplifySignOut,withAuthenticator } from '@aws-amplify/ui-react'
Amplify.configure(awsExports);


function App() {

  const [user, setUser] = useState({ username: "", email: "" });
  const [error, setError] = useState("");
  const [loginState, setVisibility] = useState({loginVisible: true, signUpVisible: false})

  const Login = (details) => {
    console.log(details);
    setUser({username: details.username, email: details.email})
  };

  const Logout = () => {
    setUser({username: "", email: ""})
  };

  const SignUp = (details) => {
    console.log(details);

  };

  const handleSignUpClick = () => {
    loginState.loginVisible ? setVisibility({loginVisible: false, signUpVisible: true}): setVisibility({loginVisible: true, signUpVisible: false});
    console.log(loginState)
  }

  return (
    <div className="App">
    
      {loginState.loginVisible ? <LoginForm Login ={Login} error={error}/>
       : null}
      {loginState.signUpVisible ? <SignUpForm Login ={Login} error={error}/>
       : null}
      <button onClick={handleSignUpClick}>
        Sign Up
      </button>
    </div>
  );
}

export default App;
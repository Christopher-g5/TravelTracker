import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TrackedFlights from './components/TrackedFlights';
import React, {useState} from "react";
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import awsExports from "./aws-exports";
import { AmplifySignOut,withAuthenticator } from '@aws-amplify/ui-react'
import { Helmet } from "react-helmet";


Amplify.configure(awsExports);

function App() {

  const [user, setUser] = useState({ username: "", email: "" });
  const [loginState, setVisibility] = useState({loginVisible: true, signUpVisible: false})
  const [showMainPage, setMainVisibility] = useState(false);

  const Login = (details) => {
    console.log(details);
    setUser({username: details.username, email: details.email})
  };

  const showMain = () => {
    setMainVisibility(true);
  }

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
      {showMainPage ? 
      <div>
        <TrackedFlights/>
      </div>
      : (
      loginState.loginVisible ? 
        <div>
          <LoginForm Login ={Login} showMain={showMain} />
          <button onClick={handleSignUpClick}>
            Create an Account
          </button>
        </div>
      :
      loginState.signUpVisible ? 
        <div>
          <SignUpForm Login ={Login} handleSignUpClick = {handleSignUpClick}/>
          <button onClick={handleSignUpClick}>
            Already have an Account: Sign in
          </button>
        </div>
      : null
    )}
    </div>
  );
}

export default App;
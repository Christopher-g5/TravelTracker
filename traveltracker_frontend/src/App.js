import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TrackedFlights from './components/TrackedFlights';
import React, {useState} from "react";
import Amplify from 'aws-amplify';
import awsExports from "./aws-exports";
import { AmplifySignOut,withAuthenticator } from '@aws-amplify/ui-react'


Amplify.configure(awsExports);

function App() {

  const [loginState, setVisibility] = useState({loginVisible: true, signUpVisible: false})
  const [showMainPage, setMainVisibility] = useState(false);
  const [uid, setUID] = useState({data:" "});

  const Login = (uniqueID) => {
    console.log(uniqueID);
    setUID({data: uniqueID});
  };

  const showMain = () => {
    setMainVisibility(true);
  }

  const Logout = () => {
    setUID(" ");
  };

  const handleSignUpClick = () => {
    loginState.loginVisible ? setVisibility({loginVisible: false, signUpVisible: true}): setVisibility({loginVisible: true, signUpVisible: false});
    console.log(loginState)
  }

  return (
    <div className="App">
      <div className = "titleContainer">
        <h1>Travel Tracker</h1>
      </div>
      <div className="mainContainer">
      {showMainPage ? 
      <div>
        <TrackedFlights data={uid.data}/>
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
    </div>
  );
}

export default App
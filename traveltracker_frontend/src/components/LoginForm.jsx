import React, { useState } from "react";
import { Auth } from "aws-amplify";

function LoginForm({ Login, showMain }) {
  const [details, setDetails] = useState({ username: "", password: "" });
  const [verification, setVerification] = useState({
    isRequired: false,
    code: "",
  });

  const submitHandler = async function (event) {
    event.preventDefault();

    const usernameInputField = document.getElementById("username");
    const passwordInputField = document.getElementById("password");
    let reponse = null;
    try {
      //Cognito Sign in
      reponse = await Auth.signIn(details.username, details.password);
      console.log("auth reponse", reponse.attributes.email);
      showMain();
    } catch (error) {
      //Unsuccesful login conditions
      if (
        error.name === "NotAuthorizedException" ||
        error.name === "UserNotFoundException"
      ) {
        usernameInputField.value = "";
        passwordInputField.value = "";
      } else if (error.name === "UserNotConfirmedException") {
        //User not yet verified
        setVerification({ ...verification, isRequired: true });
      } else console.log("error signing in", error);
    }
    //Successful Login will return email to App.js
    Login(reponse.attributes.email);
  };

  const handleVerificationClick = async function (event) {
    const verificationInputField = document.getElementById("verification");
    console.log(verification.code);
    try {
      let reponse = await Auth.confirmSignUp(
        details.username,
        verification.code
      );
      showMain();
      //console.log("auth reponse", reponse);
    } catch (error) {
      if (error.name === "CodeMismatchException") {
        verificationInputField.value = "Incorrect Code";
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="name"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
        </div>
        <div className="form_group">
          <label html="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
          />
        </div>
        <input type="submit" value="LOGIN" />
        <div>
          {verification.isRequired ? (
            <div className="form_group">
              <label html="verification">Verification Code: </label>
              <input
                type="verification"
                name="verification"
                id="verification"
                onChange={(e) =>
                  setVerification({ ...verification, code: e.target.value })
                }
              />
              <button onClick={handleVerificationClick}>Submit</button>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

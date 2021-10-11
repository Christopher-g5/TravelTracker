import React, { useState } from "react";
import { Auth } from "aws-amplify";

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ username: "", password: "" });
  const [verification, setVerification] = useState({
    isRequired: false,
    code: "",
  });

  const submitHandler = async function (event) {
    event.preventDefault();
    try {
      let reponse = await Auth.signIn(details.username, details.password);
      console.log("auth reponse", reponse);
    } catch (error) {
      if (error.name == "UserNotConfirmedException") {
        setVerification({ ...verification, isRequired: true });
      } else console.log("error signing in", error);
    }

    Login(details);
  };

  const handleVerificationClick = async function (event) {
    console.log(verification.code);
    let reponse = await Auth.confirmSignUp(details.username, verification.code);
    console.log("auth reponse", reponse);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        {error != "" ? <div className="error">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="name"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
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
            value={details.password}
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
                value={verification.code}
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

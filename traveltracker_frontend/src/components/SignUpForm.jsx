import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function SignUpForm({ Login, handleSignUpClick }) {
  const [details, setDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const [phoneNumberState, setPhoneNumberState] = useState();

  const submitHandler = async function (event) {
    event.preventDefault();
    try {
      let reponse = await Auth.signUp({
        username: details.username,
        password: details.password,
        attributes: {
          name: details.name,
          email: details.email,
          address: details.address,
          phone_number: phoneNumberState,
        },
      });

      //Auth.console.log("auth reponse", reponse);
      handleSignUpClick();
    } catch (error) {
      console.log("error signing in", error);
    }

    Login(details);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Create New Account</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
            value={details.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Address: </label>
          <input
            type="address"
            name="address"
            id="address"
            onChange={(e) =>
              setDetails({ ...details, address: e.target.value })
            }
            value={details.address}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number: </label>
          <PhoneInput
            placeholder="(510)123-4567"
            value={phoneNumberState}
            onChange={setPhoneNumberState}
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
        <input type="submit" value="Create Account" />
      </div>
    </form>
  );
}

export default SignUpForm;

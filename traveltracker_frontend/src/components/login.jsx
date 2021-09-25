import React, { Component } from "react";

class Login extends React.Component {
  render() {
    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    const Login = (details) => {
      console.log(details);
    };

    const Logout = () => {
      console.log("Logout");
    };

    return (
      <div>
        {user.email != "" ? (
          <div className="welcome">
            <h2>
              Welcome, <span>{user.name}</span>
            </h2>
            <button>Logout</button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    );
  }
}

export default Login;

import React, { useState } from "react";
// import { useHistory } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // const [password,setPassword]=useState("")
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Account Logged-In Successfully", "success");
    } else {
      // alert("Invalid Creentials")
      props.showAlert("Invalid Detials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-3">
      <h1> Login to continue to NotesWrap </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email"> Email address </label>{" "}
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />{" "}
          <small id="emailHelp" className="form-text text-muted">
            {" "}
            We 'll never share your email with anyone else.
          </small>{" "}
        </div>{" "}
        <div className="form-group">
          <label for="password"> Password </label>{" "}
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />{" "}
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          Submit{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default Login;

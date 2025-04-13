import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // const [password,setPassword]=useState("")
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      localStorage.setItem("token", data.authtoken);
      history("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert(data.error || "Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-3">
      <h1 className="my-2"> Create an account to use NotesWrap </h1>{" "}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"> Name </label>{" "}
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            required
          />
        </div>{" "}
        <div className="form-group">
          <label htmlFor="email"> Email address </label>{" "}
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password </label>{" "}
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword"> Confirm Password </label>{" "}
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={onChange}
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          Submit{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
};

export default Signup;

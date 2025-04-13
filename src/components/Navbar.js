import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          {" "}
          NotesWrap{" "}
        </Link>{" "}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse" // Modified line
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/">
                {" "}
                Home <span className="sr-only"> (current) </span>
              </Link>
            </li>{" "}
            <li
              className={`nav-item ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/about">
                {" "}
                About{" "}
              </Link>{" "}
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                {" "}
                Login{" "}
              </Link>{" "}
              <Link className="btn btn-primary mx-2" to="/signup" role="button">
                {" "}
                Signup{" "}
              </Link>
            </form>
          ) : (
            <button className="btn btn-danger mx-2" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </button>
          )}
        </div>{" "}
      </nav>{" "}
    </div>
  );
};

export default Navbar;

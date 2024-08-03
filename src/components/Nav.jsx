import React from "react";
import cLogo from "../../public/RDlogo.svg";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ setIslogin, islogin }) => {
  const navigator = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info px-5">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={cLogo} alt="Logo" className="companyLogo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link fs-5">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="employee-list" className="nav-link fs-5">
                Employee List
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {islogin && <span className="navbar-text me-3">Welcome Admin</span>}
            {islogin ? (
              <button
                className="btn btn-dark"
                onClick={() => setIslogin((prev) => !prev)}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-outline-light"
                onClick={() => navigator("/")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

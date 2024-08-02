import "../css/Nave.css";
import cLogo from "../../public/RDlogo.svg";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ setIslogin, islogin }) => {
  const navigator = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={cLogo} alt="Logo" className="companyLogo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="employee-list">Employee List</Link>
        </li>
      </ul>
      <div className="navbar-user">
        {islogin ? <span>welcome Admin</span> : <span></span>}

        {islogin ? (
          <button
            className="logout-button"
            onClick={() => setIslogin((prev) => !prev)}
          >
            Logout
          </button>
        ) : (
          <button className="logout-button" onClick={() => navigator("/")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;

import "../css/Nave.css";
import cLogo from "../../public/RDlogo.svg";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={cLogo} alt="Logo" className="companyLogo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link  to="/">Home</Link>
        </li>
        <li>
          <Link to="employee-list">Employee List</Link>
        </li>
      </ul>
      <div className="navbar-user">
        <span>Gokul Selva</span>
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Nav;

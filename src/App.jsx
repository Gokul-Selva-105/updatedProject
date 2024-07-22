import LoginForm from "./components/LoginForm";
import cLogo from "../public/RDlogo.svg";
import DashBord from "./components/DashBord";
import Nav from "./components/Nav";
import EmployeeList from "./components/EmployeeList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/* <LoginForm/>       */}
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<DashBord />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

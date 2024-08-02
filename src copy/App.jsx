import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import DashBord from "./components/DashBord";
import Nav from "./components/Nav";
import EmployeeList from "./components/EmployeeList";
import ProtectedRoute from "./protected/proroute.jsx";
function App() {
  const [islogin, setIslogin] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Nav setIslogin={setIslogin} islogin={islogin} />
        <Routes>
          <Route
            path="/"
            element={
              islogin ? <DashBord /> : <LoginForm setIslogin={setIslogin} />
            }
          />
          <Route
            path="/employee-list"
            element={
              <ProtectedRoute islogin={islogin}>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

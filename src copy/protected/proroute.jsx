import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ islogin, children }) => {
  if (!islogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;

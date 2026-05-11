// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // no token: send user to login
    return <Navigate to="/login" replace />;
  }

  // token present: show the protected page
  return children;
};

export default ProtectedRoute;
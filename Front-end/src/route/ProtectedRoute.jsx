import { useContext } from "react";
import { Navigate } from "react-router-dom";
import NotesContext from "../context/NotesContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(NotesContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
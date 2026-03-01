import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <button className={`nav-item`} onClick={() => navigate("/login")}>
        <LogIn size={18} /> Login
      </button>
    </>
  );
}

export default Login;

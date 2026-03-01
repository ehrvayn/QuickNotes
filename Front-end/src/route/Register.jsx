import { useContext, useState } from "react";
import LoginContext from "../context/LoginContext";

function Register() {
  const {
    firstname,
    lastname,
    username,
    password,
    confirmPassword,
    setIsRegistering,
  } = useContext(LoginContext);

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const register = async () => {
    if (confirmPassword !== password) {
      setIsSuccess(false);
      setMessage("Passwords do not match!");
      return;
    }
    try {
      let response = await fetch("https://quicknotesbackend-e5oz.onrender.com/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, firstname, lastname }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage(data.message);
        setTimeout(() => setIsRegistering(false), 1500);
      } else {
        setIsSuccess(false);
        setMessage(data.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {message && (
        <p className={`inline-message ${isSuccess ? "inline-success" : "inline-error"}`}>
          {message}
        </p>
      )}
      <button className="submit-btn" onClick={register}>
        Submit
      </button>
      <button className="back-btn" onClick={() => setIsRegistering(false)}>
        Back
      </button>
    </>
  );
}

export default Register;
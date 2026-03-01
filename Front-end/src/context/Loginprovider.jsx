import { useState } from "react";
import LoginContext from "./LoginContext";

function LoginProvider({ children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        firstname,
        setFirstname,
        lastname,
        setLastname,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isRegistering,
        setIsRegistering,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;

import { createContext, useState } from "react";

const LoginMethodContext = createContext();

function LoginMethodProvider({ children }) {
  const [loginMethod, setLoginMethod] = useState([]);
  return (
    <LoginMethodContext.Provider value={{ loginMethod, setLoginMethod }}>
      {children}
    </LoginMethodContext.Provider>
  );
}

export { LoginMethodContext, LoginMethodProvider };

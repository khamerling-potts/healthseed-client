import { createContext, useState } from "react";

const ProvidersContext = createContext();

function ProvidersProvider({ children }) {
  const [providers, setProviders] = useState([]);
  return (
    <ProvidersContext.Provider value={{ providers, setProviders }}>
      {children}
    </ProvidersContext.Provider>
  );
}

export { ProvidersContext, ProvidersProvider };

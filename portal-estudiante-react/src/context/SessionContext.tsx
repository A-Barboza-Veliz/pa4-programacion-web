// context/SessionContext.tsx
// Manejo responsable de la sesión: el token se guarda en localStorage bajo una
// única clave, se expone mediante contexto y se limpia explícitamente en logout.

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const TOKEN_KEY = "isil_portal_token";

type SessionContextType = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) setTokenState(stored);
  }, []);

  const setToken = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenState(null);
  };

  return (
    <SessionContext.Provider value={{ token, setToken, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession debe usarse dentro de SessionProvider");
  return ctx;
}

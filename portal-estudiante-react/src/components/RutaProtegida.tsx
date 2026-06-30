// components/RutaProtegida.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function RutaProtegida() {
  const { token } = useSession();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

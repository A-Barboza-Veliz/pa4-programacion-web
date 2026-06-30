// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import RutaProtegida from "./components/RutaProtegida";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import Detalle from "./pages/Detalle";

// URL del módulo público (Next.js), configurable por variable de entorno.
const SITIO_PUBLICO_URL = import.meta.env.VITE_SITIO_PUBLICO_URL ?? "http://localhost:3000";

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RutaProtegida />}>
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/detalle/:codigo" element={<Detalle />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="*"
            element={
              <div style={{ padding: 24 }}>
                <p>Página no encontrada.</p>
                <a href={SITIO_PUBLICO_URL}>Ir al sitio público</a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}

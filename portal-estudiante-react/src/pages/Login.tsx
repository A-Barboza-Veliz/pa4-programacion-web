// pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSimulado, refrescarTokenSimulado } from "../api/authApi";
import { useSession } from "../context/SessionContext";

export default function Login() {
  const navigate = useNavigate();
  const { token, setToken, logout } = useSession();
  const [correo, setCorreo] = useState("estudiante@isil.edu.pe");
  const [clave, setClave] = useState("123456");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = async () => {
    try {
      setError("");
      setMensaje("Iniciando sesión...");
      const data = await loginSimulado({ correo, clave });
      setToken(data.token);
      setMensaje("Sesión iniciada y token guardado");
      navigate("/cursos");
    } catch {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      setMensaje("");
    }
  };

  const cerrarSesion = () => {
    logout();
    setMensaje("Sesión cerrada");
    setError("");
  };

  const renovarToken = async () => {
    try {
      setError("");
      setMensaje("Solicitando refrescar token...");
      const data = await refrescarTokenSimulado();
      setToken(data.token);
      setMensaje("Nuevo token generado");
    } catch {
      setError("Error al renovar token");
      setMensaje("");
    }
  };

  return (
    <div className="auth-page">
      <section className="login-card-container">
        <h2>INGRESE CREDENCIALES</h2>

        <div className="login-form-row">
          <input
            className="login-input-field"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
          />
          <input
            className="login-input-field"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder="Clave"
            type="password"
          />
        </div>

        <div className="login-buttons-row">
          <button className="login-btn login-btn-primary" onClick={iniciarSesion}>
            Login
          </button>
          <button className="login-btn login-btn-secondary" onClick={renovarToken}>
            Refresh token
          </button>
          {token && (
            <button className="login-btn login-btn-logout" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          )}
        </div>

        {mensaje && <p className="login-msg-success">{mensaje}</p>}
        {error && <p className="login-msg-error">{error}</p>}

        <h3 className="login-token-title">Access Token actual</h3>
        <pre className="login-token-box">{token || "Sin token"}</pre>
      </section>
    </div>
  );
}

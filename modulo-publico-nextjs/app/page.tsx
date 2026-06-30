
// app/page.tsx
// Página de inicio pública (visitantes no autenticados). Server Component (SSR).
import Link from "next/link";

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_ESTUDIANTE_URL ?? "http://localhost:5173";

export default function Home() {
  return (
    <div className="visitante-container">
      <header className="visitante-header">
        <div className="visitante-header-content">
          <div className="visitante-logo">
            <span className="visitante-logo-icon"></span>
            <span className="visitante-logo-text">ISIL - Instituto San Ignacio de Loyola</span>
          </div>
          <nav className="visitante-nav">
            <Link href="/" className="visitante-nav-link active">Inicio</Link>
            <Link href="/cursos" className="visitante-nav-link">Cursos</Link>
            <a href={PORTAL_URL} className="visitante-nav-link login">Iniciar Sesión</a>
          </nav>
        </div>
      </header>

      <section className="visitante-hero">
        <div className="visitante-hero-content">
          <span className="visitante-hero-badge">Gestión de Cursos e Inscripciones</span>
          <h1 className="visitante-hero-title">
            Estudia con{" "}
            <span className="visitante-hero-highlight">calidad académica</span>{" "}
            internacional
          </h1>
          <p className="visitante-hero-subtitle">
            Da el primer paso hacia tu formación profesional. Explora la oferta
            académica del Instituto San Ignacio de Loyola.
          </p>
          <div className="visitante-hero-buttons">
            <Link href="/cursos" className="visitante-btn-primary">Ver Cursos</Link>
            <a href={PORTAL_URL} className="visitante-btn-secondary">Portal del Estudiante</a>
          </div>
        </div>
      </section>

      <section className="visitante-info">
        <div className="visitante-info-grid">
          <div className="visitante-info-card">
            <div className="visitante-info-icon"></div>
            <h3>Misión</h3>
            <p>Formar profesionales competentes con sólidos valores éticos y compromiso social.</p>
          </div>
          <div className="visitante-info-card">
            <div className="visitante-info-icon"></div>
            <h3>Visión</h3>
            <p>Ser reconocidos como la mejor institución educativa del país en innovación y calidad.</p>
          </div>
          <div className="visitante-info-card">
            <div className="visitante-info-icon"></div>
            <h3>Valores</h3>
            <p>Excelencia, innovación, responsabilidad, respeto y compromiso con la comunidad.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
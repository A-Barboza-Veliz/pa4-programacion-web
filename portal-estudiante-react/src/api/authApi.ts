// api/authApi.ts
// Simulación de autenticación basada en token (JWT) para el Portal del Estudiante.
// En un escenario real, estas llamadas irían contra la API REST del backend (PA2).

export type Credenciales = {
  correo: string;
  clave: string;
};

export type SesionData = {
  token: string;
  usuario?: {
    nombre: string;
    correo: string;
  };
};

// Genera un token con apariencia de JWT (header.payload.signature) para fines
// demostrativos. No es un JWT firmado de verdad, pero ilustra su estructura.
function generarTokenSimulado(correo: string): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: correo,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  );
  const signature = Math.random().toString(36).slice(2, 18);
  return `${header}.${payload}.${signature}`;
}

export const loginSimulado = async ({ correo, clave }: Credenciales): Promise<SesionData> => {
  await esperar(300);
  if (correo === "estudiante@isil.edu.pe" && clave === "123456") {
    return {
      token: generarTokenSimulado(correo),
      usuario: {
        nombre: "Alejandro Barboza",
        correo,
      },
    };
  }
  throw new Error("Credenciales inválidas");
};

export const refrescarTokenSimulado = async (): Promise<SesionData> => {
  await esperar(300);
  return { token: generarTokenSimulado("renovado") };
};

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
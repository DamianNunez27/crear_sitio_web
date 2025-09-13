"use client";
import { useState } from "react";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();
    setMensaje(data.message || data.error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Crea tu cuenta en DeManoEnMano</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Únete a nuestra comunidad para donar y recibir objetos de manera segura y responsable.
      </p>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Nombre completo"
          className="p-2 border rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Registrarse
        </button>
      </form>
      {mensaje && <p className="mt-4 text-blue-600">{mensaje}</p>}
    </div>
  );
}

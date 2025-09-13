"use client";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [objetos, setObjetos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  async function fetchObjetos() {
    const res = await fetch("/api/objetos");
    const data = await res.json();
    setObjetos(data.objetos);
  }

  async function publicarObjeto(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await fetch("/api/objetos", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ titulo, descripcion, telefono, direccion }),
    });

    setTitulo("");
    setDescripcion("");
    setTelefono("");
    setDireccion("");
    fetchObjetos();
  }

  useEffect(() => {
    fetchObjetos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Usuario</h1>

      <form onSubmit={publicarObjeto} className="mb-8 space-y-2">
        <input className="border p-2 w-full" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <textarea className="border p-2 w-full" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Publicar Objeto</button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Todos los objetos</h2>
      <ul className="space-y-2">
        {objetos.map((o) => (
          <li key={o._id} className="p-3 border rounded bg-green-50">
            <strong>{o.titulo}</strong> - {o.descripcion}
            <p>📞 {o.telefono}</p>
            <p>📍 {o.direccion}</p>
            <span className="text-sm text-gray-500">Estado: {o.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

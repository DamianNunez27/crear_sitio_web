"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [objetos, setObjetos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  async function fetchObjetos() {
    const res = await fetch("/api/objetos");
    const data = await res.json();
    setObjetos(data.objetos);
  }

  async function eliminarObjeto(id) {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/objetos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        setMensaje("❌ Error eliminando: " + err.error);
        return;
      }

      setMensaje("✅ Objeto eliminado correctamente");
      fetchObjetos();
    } catch (error) {
      setMensaje("❌ Error en eliminarObjeto");
      console.error("Error en eliminarObjeto:", error);
    }
  }

  async function aprobarObjeto(id) {
    const token = localStorage.getItem("token");
    try {
      await fetch(`/api/objetos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "aprobado" }),
      });
      setMensaje("✅ Objeto aprobado");
      fetchObjetos();
    } catch (error) {
      setMensaje("❌ Error aprobando objeto");
    }
  }

  function empezarEdicion(obj) {
    setMensaje(`✏️ Aquí iría la lógica para editar: ${obj.titulo}`);
  }

  useEffect(() => {
    fetchObjetos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración (Admin)</h1>

      {mensaje && (
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 rounded">
          {mensaje}
        </div>
      )}

      <ul className="space-y-2">
        {objetos.map((o) => (
          <li key={o._id} className="p-3 border rounded bg-white shadow">
            <strong>{o.titulo}</strong> - {o.descripcion}
            <p>📞 {o.telefono}</p>
            <p>📍 {o.direccion}</p>
            <span className="text-sm text-gray-500">Estado: {o.status}</span>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => aprobarObjeto(o._id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Aprobar
              </button>
              <button
                onClick={() => empezarEdicion(o)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarObjeto(o._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// ✅ PATCH: editar o aprobar objeto (solo admin)
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const authHeader = req.headers.get("authorization");
    if (!authHeader)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });

    const updates = await req.json();

    const client = await clientPromise;
    const db = client.db("sitio_web");

    await db
      .collection("objetos")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    return NextResponse.json({ message: "Objeto actualizado correctamente" });
  } catch (error) {
    console.error("Error en PATCH /api/objetos/[id]:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// ✅ DELETE: eliminar objeto (solo admin)
export async function DELETE(req, { params }) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db("sitio_web");

    await db.collection("objetos").deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: "Objeto eliminado" });
  } catch (error) {
    console.error("Error eliminando objeto:", error);
    return NextResponse.json({ error: "Error eliminando objeto" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sitio_web");

    const objetos = await db.collection("objetos").find().toArray();
    return NextResponse.json({ objetos });
  } catch (error) {
    console.error("Error en GET /api/objetos:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();
    const { titulo, descripcion, telefono, direccion } = body;

    if (!titulo || !descripcion || !telefono || !direccion) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const nuevoObjeto = {
      titulo,
      descripcion,
      telefono,
      direccion,
      usuarioId: decoded.id,
      status: "pendiente",
      creadoEn: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("sitio_web");
    await db.collection("objetos").insertOne(nuevoObjeto);

    return NextResponse.json({ message: "Objeto enviado para revisión" });
  } catch (error) {
    console.error("Error en POST /api/objetos:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// src/app/api/vuelos/route.js

import { fetchData, handleAdd, handleDelete, handleUpdate } from "../../../src/operaciones_mysql/mysqlOperations"; 

export async function GET(req) {
  try {
    const data = await fetchData();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching data", error }), { status: 500 });
  }
}

export async function POST(req) {
  const { origen, destino, fecha, hora, asientosDisponibles } = await req.json();
  try {
    await handleAdd(origen, destino, fecha, hora, asientosDisponibles);
    return new Response(JSON.stringify({ message: "Vuelo agregado" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error adding data", error }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  try {
    await handleDelete(id);
    return new Response(JSON.stringify({ message: "Vuelo eliminado" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error deleting data", error }), { status: 500 });
  }
}

export async function PUT(req) {
  const { id, origen, destino, fecha, hora, asientosDisponibles } = await req.json();
  try {
    await handleUpdate(id, origen, destino, fecha, hora, asientosDisponibles);
    return new Response(JSON.stringify({ message: "Vuelo actualizado" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error updating data", error }), { status: 500 });
  }
}

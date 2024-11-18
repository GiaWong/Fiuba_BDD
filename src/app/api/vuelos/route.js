const { fetchDataFromMySQL, handleAddToMySQL, handleDeleteFromMySQL, handleUpdateInMySQL } = require('../../../../backend/operations/mysqlOperations');

export async function GET(req) {
  try {
    const data = await fetchDataFromMySQL();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ message: 'Error fetching data', error: error.message || error }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { origen, destino, fecha, hora, asientosDisponibles } = await req.json();
    await handleAddToMySQL(origen, destino, fecha, hora, asientosDisponibles);
    return new Response(JSON.stringify({ message: 'Vuelo agregado' }), { status: 200 });
  } catch (error) {
    console.error('Error adding data:', error);
    return new Response(JSON.stringify({ message: 'Error adding data', error: error.message || error }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await handleDeleteFromMySQL(id);
    return new Response(JSON.stringify({ message: 'Vuelo eliminado' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting data:', error);
    return new Response(JSON.stringify({ message: 'Error deleting data', error: error.message || error }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, origen, destino, fecha, hora, asientosDisponibles } = await req.json();
    await handleUpdateInMySQL(id, origen, destino, fecha, hora, asientosDisponibles);
    return new Response(JSON.stringify({ message: 'Vuelo actualizado' }), { status: 200 });
  } catch (error) {
    console.error('Error updating data:', error);
    return new Response(JSON.stringify({ message: 'Error updating data', error: error.message || error }), { status: 500 });
  }
}
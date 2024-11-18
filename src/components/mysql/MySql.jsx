"use client";

import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";


export default function MySql() {
  const [data, setData] = useState([]);
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [asientosDisponibles, setAsientosDisponibles] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  //funcion que carga los datos desde el backend para mostrarlos en la tabla "vuelos"
  const loadData = async () => {
    const response = await fetch("/api/vuelos");
    const dataList = await response.json();
    console.log("Datos recibidos:", dataList);
    setData(Array.isArray(dataList) ? dataList : []);

  };
  useEffect(() => {
    loadData();
  }, []);

  const clearForm = () => {
    setOrigen("");
    setDestino("");
    setFecha("");
    setHora("");
    setAsientosDisponibles("");
    setEditIndex(null);
  };

  //funcion responsable de agregar vuelos al backend
  const handleAddClick = async () => {

    // Muestra los datos que serán enviados al backend
    console.log("Datos enviados al backend:", { 
      origen, 
      destino, 
      fecha, 
      hora, 
      asientosDisponibles 
    });

    const response = await fetch("/api/vuelos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origen,
        destino,
        fecha,
        hora,
        asientosDisponibles,
      }),
    });
    await response.json();
    clearForm();
    loadData();
  };

 //Esta función elimina un vuelo del backend
  const handleDeleteClick = async (index) => {
    const response = await fetch("/api/vuelos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data[index].id,
      }),
    });
    await response.json();
    loadData();
  };

  const handleEdit = (index) => {
    const item = data[index];
    setOrigen(item.origen);
    setDestino(item.destino);
    setFecha(item.fecha);
    setHora(item.hora);
    setAsientosDisponibles(item.asientosDisponibles);
    setEditIndex(index);
  };

  // Si se está editando datos, esta función envía las actualizaciones al backend
  const handleUpdateClick = async () => {
    if (editIndex !== null) {
      const response = await fetch("/api/vuelos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data[editIndex].id,
          origen,
          destino,
          fecha,
          hora,
          asientosDisponibles,
        }),
      });
      await response.json();
      clearForm();
      loadData();
    }
  };

  return (
    <Box p={8} maxWidth="800px" mx="auto" bg="gray.50" borderRadius="lg" boxShadow="md">
      <Heading mb={6} textAlign="center" color="teal.500">
        Usando MySQL
      </Heading>

      {/* Formulario para ingresar un vuelo */}
      <VStack spacing={4} mb={6}>
        <FormControl>
          <FormLabel color="teal.600">Origen</FormLabel>
          <Input
            placeholder="Origen"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            variant="filled"
            focusBorderColor="teal.400"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="teal.600">Destino</FormLabel>
          <Input
            placeholder="Destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            variant="filled"
            focusBorderColor="teal.400"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="teal.600">Fecha</FormLabel>
          <Input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            variant="filled"
            focusBorderColor="teal.400"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="teal.600">Hora</FormLabel>
          <Input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            variant="filled"
            focusBorderColor="teal.400"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="teal.600">Asientos Disponibles</FormLabel>
          <Input
            type="number"
            value={asientosDisponibles}
            onChange={(e) => setAsientosDisponibles(e.target.value)}
            variant="filled"
            focusBorderColor="teal.400"
          />
        </FormControl>

        {editIndex !== null ? (
          <Button colorScheme="teal" width="full" onClick={handleUpdateClick}>
            Actualizar Vuelo
          </Button>
        ) : (
          <Button colorScheme="teal" width="full" onClick={handleAddClick}>
            Agregar Vuelo
          </Button>
        )}
      </VStack>

      {/* Tabla para mostrar los vuelos */}
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th color="teal.600">Origen</Th>
            <Th color="teal.600">Destino</Th>
            <Th color="teal.600">Fecha</Th>
            <Th color="teal.600">Hora</Th>
            <Th color="teal.600">Asientos Disponibles</Th>
            <Th color="teal.600" textAlign="center">Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={item.id}>
              <Td>{item.origen}</Td>
              <Td>{item.destino}</Td>
              <Td>{item.fecha}</Td>
              <Td>{item.hora}</Td>
              <Td>{item.asientosDisponibles}</Td>
              <Td textAlign="center">
                <HStack justify="center">
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="teal"
                    onClick={() => handleEdit(index)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDeleteClick(index)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

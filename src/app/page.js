
// src/app/Page.js

'use client';

import React, { useState, useEffect } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { fetchData, handleAdd, handleDelete, handleUpdate } from '../operaciones_fireStone/firestoreOperations'; // Asegúrate de usar ../ para subir un nivel de carpeta

export default function Page() {
  const [data, setData] = useState([]);
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [asientosDisponibles, setAsientosDisponibles] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Función para cargar los datos desde Firestore
  const loadData = async () => {
    const dataList = await fetchData();
    setData(dataList);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddClick = () => {
    handleAdd(origen, destino, fecha, hora, asientosDisponibles);
    setOrigen("");
    setDestino("");
    setFecha("");
    setHora("");
    setAsientosDisponibles("");
    loadData();
  };

  const handleDeleteClick = (index) => {
    handleDelete(data[index].id);
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

  const handleUpdateClick = () => {
    if (editIndex !== null) {
      handleUpdate(data[editIndex].id, origen, destino, fecha, hora, asientosDisponibles);
      loadData();
      setEditIndex(null);
      setOrigen("");
      setDestino("");
      setFecha("");
      setHora("");
      setAsientosDisponibles("");
    }
  };

  return (
    <Box p={8} maxWidth="800px" mx="auto" bg="gray.50" borderRadius="lg" boxShadow="md">
      <Heading mb={6} textAlign="center" color="teal.500">
        Gestión de Vuelos
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

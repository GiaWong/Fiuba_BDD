'use client';

import React, { useState, useEffect } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhYYuitorjDvnZXlfyVj_I2JbMVe6d5vE",
  authDomain: "tp-bd-merlino.firebaseapp.com",
  projectId: "tp-bd-merlino",
  storageBucket: "tp-bd-merlino.firebasestorage.app",
  messagingSenderId: "116391928915",
  appId: "1:116391928915:web:409d0822afcc09e8e692a6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Obtener la instancia de Firestore

export default function Page() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Función para obtener los datos de Firestore
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "datos"));
    const dataList = [];
    querySnapshot.forEach((doc) => {
      dataList.push({ id: doc.id, ...doc.data() });
    });
    setData(dataList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (inputValue.trim()) {
      try {
        await addDoc(collection(db, "datos"), {
          value: inputValue,
        });
        setInputValue(""); // Limpiar el campo de entrada
        fetchData(); // Recargar los datos
      } catch (e) {
        console.error("Error agregando documento: ", e);
      }
    }
  };

  const handleEdit = (index) => {
    setInputValue(data[index].value);
    setEditIndex(index);
  };

  const handleUpdate = async () => {
    if (editIndex !== null && inputValue.trim()) {
      const docRef = doc(db, "datos", data[editIndex].id);
      try {
        await updateDoc(docRef, {
          value: inputValue,
        });
        setInputValue(""); // Limpiar el campo de entrada
        setEditIndex(null); // Resetear el estado de edición
        fetchData(); // Recargar los datos
      } catch (e) {
        console.error("Error actualizando documento: ", e);
      }
    }
  };

  const handleDelete = async (index) => {
    const docRef = doc(db, "datos", data[index].id);
    try {
      await deleteDoc(docRef);
      fetchData(); // Recargar los datos
    } catch (e) {
      console.error("Error eliminando documento: ", e);
    }
  };

  return (
    <Box p={8} maxWidth="800px" mx="auto" bg="gray.50" borderRadius="lg" boxShadow="md">
      <Heading mb={6} textAlign="center" color="teal.500">
        Gestión de Datos
      </Heading>

      <FormControl mb={4}>
        <FormLabel color="teal.600">Ingrese un dato</FormLabel>
        <Input
          placeholder="Nuevo dato"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="filled"
          focusBorderColor="teal.400"
        />
      </FormControl>

      <Button 
        colorScheme="teal" 
        width="full" 
        mb={6} 
        onClick={editIndex !== null ? handleUpdate : handleAdd}
        isLoading={false} // Puedes agregar isLoading si tienes alguna operación asíncrona
      >
        {editIndex !== null ? "Modificar Dato" : "Agregar Dato"}
      </Button>

      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th color="teal.600">Dato</Th>
            <Th color="teal.600" textAlign="center">Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={item.id}>
              <Td>{item.value}</Td>
              <Td textAlign="center">
                <HStack justify="center" spacing={4}>
                  <IconButton
                    colorScheme="yellow"
                    aria-label="Editar"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(index)}
                  />
                  <IconButton
                    colorScheme="red"
                    aria-label="Eliminar"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(index)}
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

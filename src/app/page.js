/** Aquí va la pagina principal */

"use client";

import React, { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, HStack } from "@chakra-ui/react";

export default function Page() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = inputValue;
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, inputValue]);
      }
      setInputValue("");
    }
  };

  const handleEdit = (index) => {
    setInputValue(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <Heading mb={6} textAlign="center">
        Gestión de Datos
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Ingrese un dato</FormLabel>
        <Input
          placeholder="Nuevo dato"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="teal" width="full" mb={6} onClick={handleAdd}>
        {editIndex !== null ? "Modificar Dato" : "Agregar Dato"}
      </Button>

      <VStack spacing={4} align="stretch">
        {data.map((item, index) => (
          <HStack key={index} spacing={4}>
            <Box flex="1" p={2} border="1px" borderColor="gray.200" borderRadius="md">
              {item}
            </Box>
            <Button colorScheme="yellow" onClick={() => handleEdit(index)}>
              Editar
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete(index)}>
              Eliminar
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

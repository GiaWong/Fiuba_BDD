"use client";

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import MySql from "@/components/mysql/MySql";     
import FireBase from "@/components/firebase/FireBase"; 
export default function Page() {
  return (
    <Flex direction="column" height="100vh" bg="gray.50" color="teal.600">
      <Heading
        mb={6}
        textAlign="center"
        color="teal.500"
      >
        Interacción con bases de datos Relacional y NoSQL : Gestión de vuelos
      </Heading>

      <Flex flex="1" justify="space-evenly" align="center" p={8}>
        {/* Sección de MySQL */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="teal.600"
          borderRadius="md"
          p={4}
          mx={2}
          height="100%"
        >
          <MySql />  {/* Renderizando el componente MySql */}
        </Box>

        {/* Sección de Firebase */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="teal.600"
          borderRadius="md"
          p={4}
          mx={2}
          height="100%"
        >  
          <FireBase />  {/* Renderizando el componente Firebase */}
        </Box>
      </Flex>
    </Flex>
  );
}

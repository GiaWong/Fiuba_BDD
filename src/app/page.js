"use client";

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import MySql from "@/components/mysql/MySql";     
import FireBase from "@/components/firebase/FireBase"; 
export default function Page() {
  return (
    <Flex direction="column" height="100vh" bg="#232a30" color="white">
      <Heading
        mb={6}
        textAlign="center"
        fontSize="lg"
        fontFamily="Poppins, sans-serif"
        pt={8}
      >
        Interacción con bases de datos Relacional y NoSQL
      </Heading>

      <Flex flex="1" justify="space-evenly" align="center" p={8}>
        {/* Sección de MySQL */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="#2b2f35"
          borderRadius="md"
          p={4}
          mx={2}
          height="100%"
        >
          <Heading fontSize="lg" mb={4}>MySQL</Heading>
          <MySql />  {/* Renderizando el componente MySql */}
        </Box>

        {/* Sección de Firebase */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="#2b2f35"
          borderRadius="md"
          p={4}
          mx={2}
          height="100%"
        >
          <Heading fontSize="lg" mb={4}>Firebase</Heading>
          <FireBase />  {/* Renderizando el componente Firebase */}
        </Box>
      </Flex>
    </Flex>
  );
}

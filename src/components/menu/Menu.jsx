"use client";

import { Flex, Image } from "@chakra-ui/react";
import { FiFileText, FiFile } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MenuLink = ({ href, icon, title }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <Flex
        align="center"
        gap="10px"
        w="170px"
        bg={isActive ? "gray.200" : "transparent"}
        p="10px"
        borderRadius="10px"
        _hover={{ bg: "gray.100" }}
      >
        {icon}
        {title}
      </Flex>
    </Link>
  );
};

const Menu = () => {
  return (
    <Flex
      w="220px"
      minW="220px"
      align="center"
      direction="column"
      bg="white"
      justify="space-between"
      pb="50px"
    >
      <Image src="/images/logoPrincipal.png" boxSize="180px" alt="Logo Principal" />

      <Flex direction="column" gap="15px" h="50%">
        <MenuLink href="/home/mysql" icon={<FiFileText size={28} color="black" />} title="MySQL" />
        <MenuLink href="/home/firebase" icon={<FiFile size={28} color="black" />} title="Firebase" />
      </Flex>
    </Flex>
  );
};

export default Menu;

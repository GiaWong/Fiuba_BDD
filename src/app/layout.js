import { Providers } from './providers';
import "./globals.css";
import { Poppins } from 'next/font/google';
import { Flex} from '@chakra-ui/react';

// Configuración de la fuente Poppins desde Google Fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers> {/* Envolviendo toda la aplicación dentro del Providers */}
          <Flex w="100vw" h="100vh" direction="column" bg="#232a30">
            <Flex
              w="100%"
              h="100%"
              p="20px"
              align="center"
              justify="center"
              direction="column"
              color="white"
            >
              {children}
            </Flex>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}

import { Button, Center, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Center h="100vh" w="100vw" flexDir="column">
        <Stack spacing="1rem" align="center">
          <Heading fontSize="9xl" color="gray.800" letterSpacing={"0.5rem"} fontStyle="italic">MASTER YOURSELF</Heading>
          <Image src="/logo.png" alt="Logo" h="60vh"/>
          <Link href="/app">
            <Button mt="2rem" p="2rem" letterSpacing={"0.1rem"} rounded="full">
              <Text fontSize="4xl">BEGIN YOUR JOURNEY</Text>
            </Button>
          </Link>
        </Stack>
      </Center>
    </>
  );
}
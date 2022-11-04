import { Heading, VStack, Icon } from "native-base";
import { Octicons } from '@expo/vector-icons'
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Header } from "../components/Header";

export function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus Bolões" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Button 
            title="Buscar Bolão por código" 
            mt={8}
            leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />} 
        />
      </VStack>
    </VStack>
  );
}

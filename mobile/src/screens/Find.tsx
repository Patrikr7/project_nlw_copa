import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('')

  const toast = useToast();
  const { navigate } = useNavigation()

  async function handleJoinPool() {
    if(!code.trim()){
      return toast.show({
        title: "Opss!",
        description: "Informe o código!",
        placement: "top",
        bgColor: "red.500",
      })
    }

    try {
      setIsLoading(true);
      await api.post('/pools/join', { code })
      
      toast.show({
        title: "Aewww!",
        description: "Você entrou no bolão com sucesso!",
        placement: "top",
        bgColor: "green.500",
      })

      navigate('pools')


    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if (error.response?.data?.message === "Pool not found.") {
        return toast.show({
          title: "Opss!",
          description: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data?.message === "You already joined this pool.") {
        return toast.show({
          title: "Opss!",
          description: "Você já está nesse bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Opss!",
        description: "Não foi possível encontrar o bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Encontre um bolão através {"\n"} de seu código único!
        </Heading>

        <Input 
          mb={2}
          autoCapitalize="characters"
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
        />

        <Button
          title="Buscar Bolão"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}

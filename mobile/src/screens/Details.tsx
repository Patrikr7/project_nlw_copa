import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
  id: string;
}

export function Details() {
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      console.log('POOL: ', response.data.pool)
      setPoolDetails(response.data.pool);

    } catch (err) {
      console.log(err);
      toast.show({
        title: "Opss!",
        description:
          "Não foi possível recuperar os dados do bolão. Por favor, tente novamente.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails[0].code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails[0].title}
        showBackButton={true}
        showShareButton
        backRoute="pools"
        onShare={handleCodeShare}
      />
      {console.log('console: ', poolDetails[0]._count.participants)} 
      {poolDetails[0]._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails[0]} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === "guesses"}
              onPress={() => setOptionSelected("guesses")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === "ranking"}
              onPress={() => setOptionSelected("ranking")}
            />
          </HStack>

          <Guesses
            poolId={poolDetails[0].id}
            code={poolDetails[0].code}
            onShare={handleCodeShare}
          />
        </VStack>
      ) : (
        <EmptyMyPoolList 
            code={poolDetails[0].code} 
            onShare={handleCodeShare} 
        />
      )}
    </VStack>
  );
}

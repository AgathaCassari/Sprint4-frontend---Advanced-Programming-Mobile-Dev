import { View, FlatList, Text, Button } from "react-native";
import ConsultaCard from "../components/ConsultaCard";
import { Consulta } from "../types/Consulta";

type Props = {
  consultas: Consulta[];
  navigation: any;
};

export default function ListaConsultasScreen({
  consultas,
  navigation,
}: Props) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#F5F7FA",
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Consultas Médicas
      </Text>

      <Button
        title="Nova Consulta"
        onPress={() =>
          navigation.navigate("Cadastro")
        }
      />

      <View style={{ height: 15 }} />

      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ConsultaCard
            consulta={item}
            onPress={() =>
              navigation.navigate(
                "Detalhe",
                { consulta: item }
              )
            }
          />
        )}
      />
    </View>
  );
}
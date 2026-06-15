import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

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
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#1565C0",
          }}
        >
          Sistema de Consultas
        </Text>

        <Text
          style={{
            color: "#666",
            marginTop: 5,
          }}
        >
          Gerenciamento de consultas médicas
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#1565C0",
          padding: 15,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 20,
        }}
        onPress={() =>
          navigation.navigate("Cadastro")
        }
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          + Nova Consulta
        </Text>
      </TouchableOpacity>

      <FlatList
        data={consultas}
        keyExtractor={(item) =>
          item.id.toString()
        }
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
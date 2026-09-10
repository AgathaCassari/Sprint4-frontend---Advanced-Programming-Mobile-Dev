import { useCallback, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AlertaCard from "../components/AlertaCard";
import { Alerta } from "../types/Alerta";
import { listar } from "../services/alertaService";

type Props = {
  navigation: any;
};

export default function ListaAlertasScreen({ navigation }: Props) {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarAlertas = useCallback(async () => {
    setCarregando(true);
    setErro(null);

    try {
      const dados = await listar();
      setAlertas(dados);
    } catch (e) {
      setErro(
        "Não foi possível carregar os alertas. Verifique se o backend está rodando em http://localhost:8080."
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  // useFocusEffect recarrega a lista toda vez que a tela volta a ficar
  // visível (ex: depois de cadastrar um alerta novo e voltar).
  useFocusEffect(
    useCallback(() => {
      carregarAlertas();
    }, [carregarAlertas])
  );

  return (
    <View style={{ padding: 20, backgroundColor: "#F5F7FA", flex: 1 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#1565C0" }}>
          PrevIA - Alertas
        </Text>

        <Text style={{ color: "#666", marginTop: 5 }}>
          Monitoramento de segurança industrial
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
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          + Novo Alerta
        </Text>
      </TouchableOpacity>

      {carregando && (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#1565C0" />
          <Text style={{ marginTop: 10, color: "#666" }}>
            Carregando alertas...
          </Text>
        </View>
      )}

      {!carregando && erro && (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text
            style={{ color: "#D32F2F", textAlign: "center", marginBottom: 15 }}
          >
            {erro}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#1565C0",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={carregarAlertas}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!carregando && !erro && alertas.length === 0 && (
        <Text style={{ textAlign: "center", color: "#666", marginTop: 40 }}>
          Nenhum alerta cadastrado ainda.
        </Text>
      )}

      {!carregando && !erro && alertas.length > 0 && (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AlertaCard
              alerta={item}
              onPress={() =>
                navigation.navigate("Detalhe", { id: item.id })
              }
            />
          )}
        />
      )}
    </View>
  );
}

import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Alerta } from "../types/Alerta";
import { buscarPorId, listar } from "../services/alertaService";

export default function DetalheAlertaScreen({ route, navigation }: any) {
  const { id } = route.params;

  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [relacionados, setRelacionados] = useState<Alerta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro(null);

    try {
      // Duas chamadas independentes: o alerta específico (GET /alertas/{id})
      // e a lista completa (GET /alertas), usadas aqui para destacar outros
      // alertas na mesma localização. Como uma não depende da outra, rodam
      // em paralelo com Promise.all em vez de uma esperar a outra à toa.
      const [dadosAlerta, todosAlertas] = await Promise.all([
        buscarPorId(id),
        listar(),
      ]);

      setAlerta(dadosAlerta);
      setRelacionados(
        todosAlertas.filter(
          (a) => a.id !== dadosAlerta.id && a.localizacao === dadosAlerta.localizacao
        )
      );
    } catch (e) {
      setErro("Não foi possível carregar este alerta.");
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1565C0" />
      </View>
    );
  }

  if (erro || !alerta) {
    return (
      <View style={styles.centro}>
        <Text style={{ color: "#D32F2F", marginBottom: 15 }}>
          {erro ?? "Alerta não encontrado."}
        </Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{alerta.tipo}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📍 Localização</Text>
        <Text>{alerta.localizacao}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>⚠️ Nível de Risco</Text>
        <Text style={styles.status}>{alerta.nivelRisco}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📝 Descrição</Text>
        <Text>{alerta.descricao}</Text>
      </View>

      {relacionados.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.label}>
            🔁 Outros alertas em "{alerta.localizacao}"
          </Text>

          {relacionados.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.relacionado}
              onPress={() =>
                navigation.push("Detalhe", { id: item.id })
              }
            >
              <Text style={styles.relacionadoTexto}>
                {item.tipo} — risco {item.nivelRisco}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Button title="Voltar para Lista" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },

  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  status: {
    color: "#1976D2",
    fontWeight: "bold",
  },

  relacionado: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginTop: 6,
  },

  relacionadoTexto: {
    color: "#1565C0",
  },
});

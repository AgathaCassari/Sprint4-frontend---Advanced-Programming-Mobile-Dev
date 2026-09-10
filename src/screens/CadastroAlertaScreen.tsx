import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { criar } from "../services/alertaService";

type Props = {
  navigation: any;
};

export default function CadastroAlertaScreen({ navigation }: Props) {
  const [tipo, setTipo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [nivelRisco, setNivelRisco] = useState("");
  const [descricao, setDescricao] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const cadastrar = async () => {
    if (
      !tipo.trim() ||
      !localizacao.trim() ||
      !nivelRisco.trim() ||
      !descricao.trim()
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      await criar({ tipo, localizacao, nivelRisco, descricao });

      setTipo("");
      setLocalizacao("");
      setNivelRisco("");
      setDescricao("");

      navigation.navigate("Lista");
    } catch (e) {
      setErro(
        "Não foi possível cadastrar o alerta. Verifique se o backend está rodando em http://localhost:8080."
      );
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Alerta</Text>

      <TextInput
        placeholder="Tipo (ex: Ausência de EPI)"
        value={tipo}
        onChangeText={setTipo}
        style={styles.input}
      />

      <TextInput
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
        style={styles.input}
      />

      <TextInput
        placeholder="Nível de risco (Alto, Médio, Baixo)"
        value={nivelRisco}
        onChangeText={setNivelRisco}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      {erro && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrar}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Cadastrar Alerta</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
  },

  erro: {
    color: "#D32F2F",
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#1565C0",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

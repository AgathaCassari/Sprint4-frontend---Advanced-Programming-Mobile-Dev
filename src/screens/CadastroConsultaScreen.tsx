import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  adicionarConsulta: (consulta: any) => void;
};

export default function CadastroConsultaScreen({
  adicionarConsulta,
}: Props) {
  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");
  const [especialidade, setEspecialidade] =
    useState("");
  const [data, setData] = useState("");

  const cadastrar = () => {
    if (
      !paciente.trim() ||
      !medico.trim() ||
      !especialidade.trim() ||
      !data.trim()
    ) {
      return;
    }

    adicionarConsulta({
      id: Date.now(),
      paciente,
      medico,
      especialidade,
      status: "Agendada",
      data,
    });

    setPaciente("");
    setMedico("");
    setEspecialidade("");
    setData("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Nova Consulta
      </Text>

      <TextInput
        placeholder="Nome do paciente"
        value={paciente}
        onChangeText={setPaciente}
        style={styles.input}
      />

      <TextInput
        placeholder="Nome do médico"
        value={medico}
        onChangeText={setMedico}
        style={styles.input}
      />

      <TextInput
        placeholder="Especialidade"
        value={especialidade}
        onChangeText={setEspecialidade}
        style={styles.input}
      />

      <TextInput
        placeholder="Data da consulta"
        value={data}
        onChangeText={setData}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrar}
      >
        <Text style={styles.textoBotao}>
          Cadastrar Consulta
        </Text>
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
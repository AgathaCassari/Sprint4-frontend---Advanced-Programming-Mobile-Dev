import { useState } from "react";
import {
  View,
  TextInput,
  Button,
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
  const [especialidade, setEspecialidade] = useState("");
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
        placeholder="Data da consulta (dd/mm/aaaa)"
        value={data}
        onChangeText={setData}
        style={styles.input}
      />

      <Button
        title="Cadastrar Consulta"
        onPress={cadastrar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});
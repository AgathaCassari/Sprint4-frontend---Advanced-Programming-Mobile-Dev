import { View, Text, StyleSheet } from "react-native";

export default function DetalheConsultaScreen({
  route,
}: any) {
  const { consulta } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {consulta.paciente}
      </Text>

      <Text>Médico: {consulta.medico}</Text>

      <Text>
        Especialidade: {consulta.especialidade}
      </Text>

      <Text>Data: {consulta.data}</Text>

      <Text>Status: {consulta.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
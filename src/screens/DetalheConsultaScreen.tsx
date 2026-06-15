import { View, Text, StyleSheet, Button } from "react-native";

export default function DetalheConsultaScreen({
  route,
  navigation,
}: any) {
  const { consulta } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {consulta.paciente}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>👨‍⚕️ Médico</Text>
        <Text>{consulta.medico}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🏥 Especialidade</Text>
        <Text>{consulta.especialidade}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Data</Text>
        <Text>{consulta.data}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📌 Status</Text>
        <Text style={styles.status}>
          {consulta.status}
        </Text>
      </View>

      <Button
        title="Voltar para Lista"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
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
});
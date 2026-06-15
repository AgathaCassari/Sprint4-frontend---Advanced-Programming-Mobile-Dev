import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Consulta } from "../types/Consulta";

type Props = {
  consulta: Consulta;
  onPress: () => void;
};

export default function ConsultaCard({
  consulta,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
    >
      <Text style={styles.nome}>
        {consulta.paciente}
      </Text>

      <Text>
        👨‍⚕️ {consulta.medico}
      </Text>

      <Text>
        🏥 {consulta.especialidade}
      </Text>

      <Text>
        📅 {consulta.data}
      </Text>

      <Text style={styles.status}>
        {consulta.status}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },

  status: {
    marginTop: 8,
    color: "#1976D2",
    fontWeight: "bold",
  },
});
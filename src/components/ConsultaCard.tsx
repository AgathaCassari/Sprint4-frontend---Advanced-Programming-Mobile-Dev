import {
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

      <Text style={styles.info}>
        👨‍⚕️ {consulta.medico}
      </Text>

      <Text style={styles.info}>
        🏥 {consulta.especialidade}
      </Text>

      <Text style={styles.info}>
        📅 {consulta.data}
      </Text>

      <Text
        style={[
          styles.status,
          {
            color:
              consulta.status === "Agendada"
                ? "#2E7D32"
                : consulta.status ===
                  "Concluída"
                ? "#1565C0"
                : "#D32F2F",
          },
        ]}
      >
        {consulta.status}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    borderLeftWidth: 6,
    borderLeftColor: "#1565C0",
  },

  nome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    marginBottom: 4,
  },

  status: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 15,
  },
});
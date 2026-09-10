import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { Alerta } from "../types/Alerta";

type Props = {
  alerta: Alerta;
  onPress: () => void;
};

function corDoRisco(nivelRisco: string): string {
  const nivel = nivelRisco.trim().toLowerCase();
  if (nivel === "alto") return "#D32F2F";
  if (nivel === "médio" || nivel === "medio") return "#F9A825";
  if (nivel === "baixo") return "#2E7D32";
  return "#1565C0";
}

export default function AlertaCard({ alerta, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.tipo}>{alerta.tipo}</Text>

      <Text style={styles.info}>📍 {alerta.localizacao}</Text>

      <Text style={styles.info} numberOfLines={2}>
        📝 {alerta.descricao}
      </Text>

      <Text
        style={[styles.status, { color: corDoRisco(alerta.nivelRisco) }]}
      >
        Risco: {alerta.nivelRisco}
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

  tipo: {
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

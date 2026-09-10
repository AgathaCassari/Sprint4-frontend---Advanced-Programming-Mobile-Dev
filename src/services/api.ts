import axios from "axios";
import { Platform } from "react-native";

// Troque pelo IP da sua máquina na rede local quando for testar em um
// celular físico com o Expo Go (ex: "192.168.0.10"). Descubra o IP com
// `ipconfig` (Windows) ou `ifconfig` / `ip a` (Mac/Linux).
const IP_DA_MAQUINA = "192.168.0.10";

function resolverBaseUrl(): string {
  if (Platform.OS === "android") {
    // Emulador Android: 10.0.2.2 aponta para o localhost da máquina host.
    return "http://10.0.2.2:8080";
  }

  // Web e simulador iOS enxergam o localhost normalmente.
  return "http://localhost:8080";

  // Para celular físico via Expo Go, comente a linha acima e use:
  // return `http://${IP_DA_MAQUINA}:8080`;
}

const api = axios.create({
  baseURL: resolverBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

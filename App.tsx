import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";

import CadastroConsultaScreen from "./src/screens/CadastroConsultaScreen";
import ListaConsultasScreen from "./src/screens/ListaConsultasScreen";
import DetalheConsultaScreen from "./src/screens/DetalheConsultaScreen";

import { consultasMock } from "./src/data/consultasMock";
import { Consulta } from "./src/types/Consulta";

const Stack = createNativeStackNavigator();

export default function App() {
  const [consultas, setConsultas] =
    useState<Consulta[]>(consultasMock);

  const adicionarConsulta = (
    novaConsulta: Consulta
  ) => {
    setConsultas([
      ...consultas,
      novaConsulta,
    ]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Consultas"
          options={{
            title: "Consultas Médicas",
          }}
        >
          {(props) => (
            <ListaConsultasScreen
              {...props}
              consultas={consultas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Cadastro"
          options={{
            title: "Nova Consulta",
          }}
        >
          {(props) => (
            <CadastroConsultaScreen
              {...props}
              adicionarConsulta={adicionarConsulta}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Detalhe"
          component={DetalheConsultaScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
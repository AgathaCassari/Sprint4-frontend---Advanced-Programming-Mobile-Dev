import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaAlertasScreen from "./src/screens/ListaAlertasScreen";
import CadastroAlertaScreen from "./src/screens/CadastroAlertaScreen";
import DetalheAlertaScreen from "./src/screens/DetalheAlertaScreen";

export type RootStackParamList = {
  Lista: undefined;
  Cadastro: undefined;
  Detalhe: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={ListaAlertasScreen}
          options={{ title: "Alertas - PrevIA" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroAlertaScreen}
          options={{ title: "Novo Alerta" }}
        />
        <Stack.Screen
          name="Detalhe"
          component={DetalheAlertaScreen}
          options={{ title: "Detalhe do Alerta" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

// You can import from local files

// or any pure javascript modules available in npm
import { ProgressBar,MD3Colors, Provider as PaperProvider } from 'react-native-paper';


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import SelectObra from "./screens/SelectObra";
import ChecklistGroup from "./screens/ChecklistGroup";
import ConfirmationScreen from "./screens/ConfirmationScreen";

const Stack = createStackNavigator();
global.alternativasCriticidade = ["A", "B", "C"]
global.alternativasConformidade = ["C", "NC", "NA"]
global.grupo_checklist;

export default function App() {
  return (
    <PaperProvider>
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SelectObra" component={SelectObra} />
          <Stack.Screen name="ChecklistGroup" component={ChecklistGroup} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AccountNavigator } from "./account.navigator";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Navigation = () => {
  const { isAuthenticated, isInitializing } = useContext(AuthenticationContext);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={50} animating={true} color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

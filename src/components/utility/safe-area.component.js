import { styled } from "styled-components/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export const SafeView = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const SafeArea = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SafeView>{children}</SafeView>
    </SafeAreaProvider>
  );
};

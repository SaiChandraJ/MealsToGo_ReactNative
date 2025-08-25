import { useRef, useContext } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { styled } from "styled-components/native";
import { Button, TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(CameraView)`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const CameraContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const [permission, requestPermission] = useCameraPermissions();
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <CameraContainer>
        <ActivityIndicator size={50} animating={true} color="blue" />
      </CameraContainer>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <CameraContainer>
        <Spacer position="top" size="large">
          <Text variant="body">We need your permission to show the camera</Text>
        </Spacer>
        <Spacer position="top" size="large">
          <Button onPress={requestPermission} title="grant permission" />
        </Spacer>
      </CameraContainer>
    );
  }

  return (
    <CameraContainer>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        facing="front"
        // ratio={"16:9"}
      />
      <Overlay onPress={snap}>
        <InnerSnap />
      </Overlay>
    </CameraContainer>
  );
};

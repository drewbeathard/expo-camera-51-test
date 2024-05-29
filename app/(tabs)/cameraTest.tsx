import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function CameraTest() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    console.log("toggle facing");
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  async function toggleTorch() {
    console.log("toggle torch");
    setTorch((current) => !current);
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraView}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          facing={facing}
          onBarcodeScanned={(data) =>
            console.log(`${JSON.stringify(data, null, 2)}`)
          }
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          enableTorch={torch}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={toggleCameraFacing} title="Flip camera" />
        <Button onPress={toggleTorch} title="Toggle torch" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraView: {
    width: "90%",
    height: 400,
  },
  buttonContainer: {
    gap: 8,
    marginTop: 8,
  },
});

import react, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text } from "react-native";
export default function App() {
  const [ready, setReady] = useState(false);

  const startLoading = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const onFinish = () => setReady(true);

  if (!ready)
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );

  return <Text>End Loading</Text>;
}

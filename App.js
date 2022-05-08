import react, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text } from "react-native";
export default function App() {
  const [ready, setReady] = useState(false);

  const startAsync = () => {};
  const onFinish = () => setReady(true);

  if (!ready)
    return (
      <AppLoading
        startAsync={startAsync}
        onFinish={onFinish}
        onError={console.error}
      />
    );

  return <Text>End Loading</Text>;
}

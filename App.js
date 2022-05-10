import { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
export default function App() {
  const [ready, setReady] = useState(false);

  const startLoading = async () => {
    // 로컬 ttf 파일들도 load할 수 있다.
    await Font.loadAsync(Ionicons.font);

    await Asset.loadAsync(require("./seulgi.jpeg"));
    // url을 이용한 이미지는 prefetch로 접근
    await Image.prefetch(
      "https://nomad-sexy-coffee.s3.ap-northeast-2.amazonaws.com/shops/u2vkaaj8o-kzkpvegr-%E1%84%89%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B52.jpeg"
    );
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

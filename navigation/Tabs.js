import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native-web";
import { useColorScheme } from "react-native";

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  console.log(isDark);

  return (
    <Tab.Navigator
      //screenOption : 네비게이션의 모든 헤더에 스타일 적용
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : "black",
        },
        tabBarStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: isDark ? "white" : "black",
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        //option : 해당 스크린에만 스타일 적용
      />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};
export default Tabs;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native-web";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

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
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -3,
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: isDark ? "white" : "black",
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        //option : 해당 스크린에만 스타일 적용
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "film" : "film-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "tv" : "tv-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;

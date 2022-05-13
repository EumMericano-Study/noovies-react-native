import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native-web";

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    //screenOption : 네비게이션의 모든 헤더에 스타일 적용
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "black",
        paddingHorizontal: 3,
        paddingVertical: 3,
      },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "white",
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      //option : 해당 스크린에만 스타일 적용
      options={{
        headerTitleContainerStyle: {
          backgroundColor: "black",
          color: "tomato",
        },
        headerRight: () => {
          <View>
            <Text>Hello</Text>
          </View>;
        },
      }}
    />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;

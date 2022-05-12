import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        backgroundColor: "black",
        color: "white",
      },
    }}
  >
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen
      name="Tv"
      component={Tv}
      options={{
        tabBarLabelStyle: { backgroundColor: "purple", color: "white" },
      }}
    />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;

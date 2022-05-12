import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Movies" component={null} />
    <Tab.Screen name="Tv" component={null} />
    <Tab.Screen name="Search" component={null} />
  </Tab.Navigator>
);

export default Tabs;

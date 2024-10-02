import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import HomeScreen from "./screens/HomeScreen";
import FoodLogScreen from "./screens/FoodLogScreen";
import CaloriesGoalScreen from "./screens/CaloriesGoalScreen";
import ExerciseTrackingScreen from "./screens/ExerciseTrackingScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Food Log") {
                iconName = "restaurant-menu";
                // }
                // else if (route.name === "Calories Goal") {
                //   iconName = "fitness-center";
              } else if (route.name === "Exercise Tracking") {
                iconName = "directions-run";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { backgroundColor: "#fff" },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Food Log" component={FoodLogScreen} />
          {/* <Tab.Screen name="Calories Goal" component={CaloriesGoalScreen} /> */}
          <Tab.Screen
            name="Exercise Tracking"
            component={ExerciseTrackingScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

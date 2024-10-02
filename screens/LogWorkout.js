import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LogWorkout({ route }) {
  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logging Workout: {workout.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

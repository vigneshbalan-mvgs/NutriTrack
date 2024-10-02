import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WorkoutStreak = () => {
  const streakDays = 7; // Example: replace with actual streak data

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You have worked out for {streakDays} consecutive days!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default WorkoutStreak;

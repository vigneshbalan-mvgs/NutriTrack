import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalorieGoalTracker = () => {
  const daysMetGoal = 5;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        You have met your calorie goal for {daysMetGoal} days this week!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ffeb3b",
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default CalorieGoalTracker;

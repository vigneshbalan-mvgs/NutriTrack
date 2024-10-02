import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit"; // Make sure to install this package
import RandomTip from "./RandomTip"; // Assume this component handles the random tips
import { Calendar } from "react-native-calendars"; // Import the Calendar component

export default function HomeScreen({ navigation }) {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [2000, 1800, 2200, 1600, 2500, 2100, 1900],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Welcome to NutriTrack!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Caloric Intake</Text>
        <LineChart
          data={data}
          width={340}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" kcal"
          withInnerLines={false}
          chartConfig={{
            backgroundColor: "#fff", // White background for the chart
            backgroundGradientFrom: "#fff", // Gradient starting color
            backgroundGradientTo: "#fff", // Gradient ending color
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 153, 255, ${opacity})`, // Line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              fill: "#907aa9",
            },
          }}
          bezier
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tip of the Day</Text>
        <RandomTip />
      </View>

      {/* New Calendar Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Workout Calendar</Text>
        <Calendar
          // Set current date and other props as needed
          current={new Date().toISOString().split("T")[0]}
          style={styles.calendar}
          onDayPress={(day) => {
            console.log("Selected day", day);
            // Handle day press if needed
          }}
          markedDates={{
            // Mark dates with different colors or states as needed
            "2024-10-01": { marked: true, dotColor: "red" },
            "2024-10-02": { marked: true, dotColor: "blue" },
            // Add more marked dates based on workout data
          }}
        />
      </View>

      {/* New Streak Tracker Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Workout Streak</Text>
        <Text style={styles.streakText}>
          You have worked out for 5 consecutive days!
        </Text>
      </View>

      {/* New Calorie Goal Tracker Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Calorie Goal Tracker</Text>
        <Text style={styles.calorieText}>
          You have met your calorie goal for 3 days this week!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2e7e9",
  },
  header: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "#07001f",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#07001f",
  },
  calendar: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  streakText: {
    fontSize: 16,
    color: "#07001f",
  },
  calorieText: {
    fontSize: 16,
    color: "#07001f",
  },
});

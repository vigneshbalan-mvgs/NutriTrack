import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { workoutPlan } from "./workoutPlanData"; // Import the workout plan data

const workouts = [
  { id: "1", name: "Yoga", icon: "https://example.com/assets/yoga.png" },
  { id: "2", name: "HIIT", icon: "https://example.com/assets/hiit.png" },
  {
    id: "3",
    name: "Strength Training",
    icon: "https://example.com/assets/strength.png",
  },
  { id: "4", name: "Cardio", icon: "https://example.com/assets/cardio.png" },
  { id: "5", name: "Pilates", icon: "https://example.com/assets/pilates.png" },
];

export default function ExerciseTrackingScreen({ navigation }) {
  const [expandedDay, setExpandedDay] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleWorkoutPress(item)}
    >
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <Text style={styles.workoutName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleWorkoutPress = (item) => {
    console.log(`Logging workout: ${item.name}`);
    // Optional: Navigate to the logging screen
    // navigation.navigate('LogWorkout', { workout: item });
  };

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const renderWorkoutPlan = () => (
    <ScrollView style={styles.scrollView}>
      {workoutPlan.map((day, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => toggleDay(index)}
            style={styles.dayToggle}
          >
            <Text style={styles.dayTitle}>{day.day}</Text>
          </TouchableOpacity>
          {expandedDay === index && (
            <View style={styles.workoutTable}>
              {day.workouts.map((workout, idx) => (
                <View key={idx} style={styles.workoutRow}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.repsText}>{workout.reps}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Tracking</Text>

      {/* Most exercised workouts */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Most Exercised Today</Text>
          <Text style={styles.cardValue}>Yoga</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Most Exercised This Month</Text>
          <Text style={styles.cardValue}>HIIT</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={workouts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <Text style={styles.title}>7-Day Workout Plan</Text>
      {renderWorkoutPlan()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf4ed",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#575279",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  dayToggle: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  workoutTable: {
    padding: 10,
    backgroundColor: "#fff",
  },
  workoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  workoutName: {
    fontSize: 16,
  },
  repsText: {
    fontSize: 16,
    color: "#555",
  },
  listContainer: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fffaf3", // Surface color
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#575279", // Muted for shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flex: 1,
  },
  dayToggle: {
    padding: 10,
    backgroundColor: "#e0def4", // Card background
    borderRadius: 5,
    marginVertical: 5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#575279", // Main text color
  },
  workoutTable: {
    padding: 10,
    backgroundColor: "#fffaf3", // Surface color
    borderRadius: 5,
    marginBottom: 10,
  },
  workoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#575279", // Main text color
  },
  repsText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#9893a5", // Muted text color
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#907aa9", // Highlight color
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "600",
    color: "#575279", // Main text color
  },
});

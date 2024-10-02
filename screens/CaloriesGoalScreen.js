import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  AsyncStorage, // Ensure to import AsyncStorage
} from "react-native";

export default function CaloriesGoalScreen() {
  const [calorieGoal, setCalorieGoal] = useState(2000); // Default calorie goal
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // New states for food logging
  const [foodName, setFoodName] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [foodLogs, setFoodLogs] = useState([]);

  useEffect(() => {
    const loadCalorieGoal = async () => {
      const savedGoal = await AsyncStorage.getItem("calorieGoal");
      if (savedGoal) {
        setCalorieGoal(Number(savedGoal));
      }
    };

    loadCalorieGoal();
  }, []);

  const handleUpdateGoal = async () => {
    if (calorieGoal <= 0) {
      Alert.alert("Error", "Please set a valid calorie goal");
      return;
    }

    await AsyncStorage.setItem("calorieGoal", calorieGoal.toString());
    setIsEditing(false);
    Alert.alert("Success", "Calorie goal updated successfully!");
  };

  const handleAddCalories = () => {
    const amount = parseInt(caloriesInput);
    if (isNaN(amount) || amount < 0) {
      Alert.alert("Error", "Please enter a valid calorie amount");
      return;
    }

    if (caloriesConsumed + amount < 0) {
      Alert.alert("Error", "Calories consumed cannot be negative");
      return;
    }

    setCaloriesConsumed((prev) => prev + amount);
    setFoodLogs((prevLogs) => [
      ...prevLogs,
      { name: foodName, calories: amount },
    ]);

    setFoodName("");
    setCaloriesInput("");
  };

  const remainingCalories = calorieGoal - caloriesConsumed;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Daily Calorie Goal</Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={calorieGoal.toString()}
            onChangeText={(value) => setCalorieGoal(Number(value))}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateGoal}>
            <Text style={styles.buttonText}>Update Goal</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.goalText}>Current Goal: {calorieGoal} kcal</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Goal</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.consumedText}>
        Calories Consumed: {caloriesConsumed} kcal
      </Text>
      <Text style={styles.remainingText}>
        Remaining Calories: {remainingCalories} kcal
      </Text>

      {remainingCalories < 0 && (
        <Text style={styles.alertText}>You've exceeded your calorie goal!</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Food Name"
        value={foodName}
        onChangeText={setFoodName}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={caloriesInput}
        onChangeText={setCaloriesInput}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCalories}>
        <Text style={styles.buttonText}>Add Food Entry</Text>
      </TouchableOpacity>

      <ScrollView style={styles.logContainer}>
        {foodLogs.map((log, index) => (
          <View key={index} style={styles.logItem}>
            <Text style={styles.logText}>
              {log.name}: {log.calories} kcal
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#faf4ed", // Rosepine background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4a2c37", // Darker text for contrast
  },
  input: {
    height: 50,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#d78c8d", // Rose-pine button color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  goalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4a2c37",
  },
  consumedText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#4a2c37",
  },
  remainingText: {
    fontSize: 16,
    marginBottom: 20,
    color: "green",
  },
  alertText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
  logContainer: {
    marginTop: 20,
  },
  logItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  logText: {
    fontSize: 16,
    color: "#4a2c37",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FoodLogScreen() {
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [foodLogs, setFoodLogs] = useState([]);

  // Load food logs from local storage
  useEffect(() => {
    const loadFoodLogs = async () => {
      try {
        const storedLogs = await AsyncStorage.getItem("foodLogs");
        if (storedLogs) {
          setFoodLogs(JSON.parse(storedLogs));
        }
      } catch (error) {
        console.error("Failed to load food logs", error);
      }
    };

    loadFoodLogs();
  }, []);

  const handleAddFood = async () => {
    if (!foodItem || !calories) {
      Alert.alert("Error", "Please enter both food item and calories");
      return;
    }

    const newFoodLog = {
      id: Math.random().toString(), // Unique ID for each food log
      item: foodItem,
      calories: parseInt(calories),
      date: new Date().toISOString().split("T")[0], // Save date for filtering
    };

    const updatedLogs = [...foodLogs, newFoodLog];
    setFoodLogs(updatedLogs);
    await saveFoodLogs(updatedLogs); // Save logs to local storage
    setFoodItem("");
    setCalories("");
  };

  const handleDeleteFood = async (id) => {
    const updatedLogs = foodLogs.filter((log) => log.id !== id);
    setFoodLogs(updatedLogs);
    await saveFoodLogs(updatedLogs); // Save updated logs to local storage
  };

  const saveFoodLogs = async (logs) => {
    try {
      await AsyncStorage.setItem("foodLogs", JSON.stringify(logs));
    } catch (error) {
      console.error("Failed to save food logs", error);
    }
  };

  // Calculate today's calories
  const today = new Date().toISOString().split("T")[0];
  const todayCalories = foodLogs
    .filter((log) => log.date === today)
    .reduce((total, log) => total + log.calories, 0);

  // Calculate this month's calories
  const monthStart = new Date();
  monthStart.setDate(1); // Set to the first day of the month
  const monthCalories = foodLogs
    .filter((log) => new Date(log.date) >= monthStart)
    .reduce((total, log) => total + log.calories, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Log</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Calories</Text>
          <Text style={styles.cardValue}>{todayCalories} kcal</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Month's Calories</Text>
          <Text style={styles.cardValue}>{monthCalories} kcal</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Food Item"
        value={foodItem}
        onChangeText={setFoodItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddFood}>
        <Text style={styles.buttonText}>Add Food</Text>
      </TouchableOpacity>
      <FlatList
        data={foodLogs} // Show all food entries
        keyExtractor={(item) => item.id.toString()} // Ensure the key is a string
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>
              {item.item} - {item.calories} kcal
            </Text>
            <TouchableOpacity onPress={() => handleDeleteFood(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    color: "#575279", // Main text color
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fffaf3", // Card surface color
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 2, // Add shadow for Android
    shadowColor: "#575279", // Shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#575279", // Main text color
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#907aa9", // Highlight color for values
  },
  input: {
    height: 50,
    borderColor: "#dbdbdb",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff", // Input background color
  },
  button: {
    backgroundColor: "#445038", // Button background color
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
  logItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
  },
  logText: {
    fontSize: 16,
    color: "#575279", // Main text color
  },
  deleteText: {
    color: "#ff0000", // Delete text color
    fontWeight: "bold",
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const tips = [
  "Drink plenty of water to stay hydrated.",
  "Incorporate more fruits and vegetables into your meals.",
  "Avoid processed foods and choose whole grains.",
  "Practice portion control to avoid overeating.",
  "Stay active and include exercise in your daily routine.",
  "Eat mindfully and savor each bite to improve digestion.",
  "Choose lean proteins such as chicken, turkey, or fish.",
  "Limit sugar intake and opt for natural sweeteners.",
  "Prepare meals at home to control ingredients and portion sizes.",
  "Incorporate healthy fats from sources like avocados and nuts.",
  "Track your food intake to stay aware of your eating habits.",
  "Snack on healthy options like nuts, yogurt, or fruits.",
  "Plan your meals for the week to avoid impulsive eating.",
  "Include whole foods in your diet and minimize additives.",
  "Eat breakfast daily to kickstart your metabolism.",
  "Limit sugary drinks and replace them with water or herbal tea.",
  "Experiment with new recipes to keep meals interesting.",
  "Find a workout buddy to stay motivated and accountable.",
  "Avoid eating late at night to improve digestion and sleep.",
  "Listen to your body and eat when you're hungry, not bored.",
  "Celebrate your progress and treat yourself occasionally.",
];

export default function RandomTip() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  return (
    <View style={styles.tipContainer}>
      <Text style={styles.tipText}>{randomTip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tipContainer: {
    padding: 10,
    borderRadius: 5,
  },
  tipText: {
    fontSize: 16,
  },
});

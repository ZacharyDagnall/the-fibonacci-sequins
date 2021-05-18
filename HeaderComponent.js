import React from "react";
import { Text, StyleSheet, View, Dimensions, Alert } from "react-native";

function HeaderComponent({ score }) {
  return (
    <View>
      <Text style={styles.header}>The Fibonacci Sequins!</Text>
      <Text style={styles.header}>Let's get fibbin</Text>
      <Text style={styles.score}>Your Current Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
    fontSize: 34,
    textAlign: "center",
    color: "olive",
    fontWeight: "bold",
  },
  score: {
    fontSize: 21,
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
  },
});

export default HeaderComponent;

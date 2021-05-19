import React from "react";
import { Text, StyleSheet, View } from "react-native";

function HeaderComponent({ score }) {
  return (
    <View>
      <Text style={styles.header}>The Fibonacci Sequins!</Text>
      {/* <Text style={styles.header}>Let's get fibbin</Text> */}
      <Text style={styles.score}>Your Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
    fontSize: 34,
    textAlign: "center",
    color: "black",
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

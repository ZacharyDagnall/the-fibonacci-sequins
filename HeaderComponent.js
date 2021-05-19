import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

function HeaderComponent({ score, newGame }) {
  return (
    <View>
      <Pressable style={styles.newGameButton} onPress={newGame}>
        <Text style={styles.newGameText}>New Game!</Text>
      </Pressable>

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
  newGameButton: {
    fontWeight: "bold",
    borderRadius: 5,
    backgroundColor: "blue",
    borderColor: "black",
    borderWidth: 2,
    elevation: 3,
    width: 89,
    alignSelf: "flex-end",
    marginTop: 13,
  },
  newGameText: {
    fontSize: 13,
    textAlign: "center",
    color: "red",
    padding: 3,
    fontWeight: "bold",
  },
});

export default HeaderComponent;

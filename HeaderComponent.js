import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

function HeaderComponent({ score, newGame, quitGame }) {
  return (
    <View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.quitGameButton} onPress={quitGame}>
          <Text style={styles.quitGameText}>Quit Game!</Text>
        </Pressable>
        <Pressable style={styles.newGameButton} onPress={newGame}>
          <Text style={styles.newGameText}>New Game!</Text>
        </Pressable>
      </View>
      <Text style={styles.header}>The Fibonacci Sequins!</Text>
      <Text style={styles.score}>Your Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 5,
    fontSize: 34,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    textShadowColor: "rgba(255, 255, 255, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  score: {
    fontSize: 21,
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    textShadowColor: "rgba(255, 255, 255, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  newGameButton: {
    fontWeight: "bold",
    borderRadius: 5,
    backgroundColor: "green",
    borderColor: "black",
    borderWidth: 2,
    elevation: 3,
    width: 89,
    marginTop: 13,
    marginRight: 13,
  },
  newGameText: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
    padding: 3,
    fontWeight: "bold",
  },
  quitGameButton: {
    fontWeight: "bold",
    borderRadius: 5,
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 2,
    elevation: 3,
    width: 89,
    marginTop: 13,
    marginLeft: 13,
  },
  quitGameText: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
    padding: 3,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HeaderComponent;

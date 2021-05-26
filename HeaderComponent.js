import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

function HeaderComponent({ score, newGame, quitGame }) {
  const [quitBTNpressed, setQuitBTNpress] = useState(false);
  const [newGameBTNpressed, setNewGameBTNpress] = useState(false);
  return (
    <View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={
            quitBTNpressed
              ? [styles.quitGameButton, styles.quitGameButtonPressed]
              : styles.quitGameButton
          }
          onPress={quitGame}
          onPressIn={() => setQuitBTNpress(true)}
          onPressOut={() => setQuitBTNpress(false)}
        >
          <Text style={styles.quitGameText}>Quit Game!</Text>
        </Pressable>
        <Pressable
          style={
            newGameBTNpressed
              ? [styles.newGameButton, styles.newGameButtonPressed]
              : styles.newGameButton
          }
          onPress={newGame}
          onPressIn={() => setNewGameBTNpress(true)}
          onPressOut={() => setNewGameBTNpress(false)}
        >
          <Text style={styles.newGameText}>New Game!</Text>
        </Pressable>
      </View>
      <Text style={styles.header}>The Fibonacci Sequins</Text>
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
    textShadowColor: "rgba(233, 233, 233, 1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  score: {
    fontSize: 21,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    // backgroundColor: "white",
  },
  newGameButton: {
    fontWeight: "bold",
    borderRadius: 5,
    backgroundColor: "orange",
    borderColor: "black",
    borderWidth: 2,
    elevation: 3,
    width: 89,
    marginTop: 13,
    marginRight: 13,
  },
  newGameButtonPressed: {
    marginRight: 21,
    backgroundColor: "#FFD700",
  },
  newGameText: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
    padding: 3,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
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
  quitGameButtonPressed: {
    marginLeft: 21,
    backgroundColor: "magenta",
  },
  quitGameText: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
    padding: 3,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  buttonsContainer: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HeaderComponent;

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Linking } from "react-native";
import Game from "./Game";
import HeaderComponent from "./HeaderComponent";
import LeaderBoard from "./LeaderBoard";
import { emptyBoard, newTile, isGameOver } from "./board";

export default function App() {
  const [board, setBoard] = useState(newTile(emptyBoard()));
  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(board.score);
    checkGameOver();
  }, [board]);

  function newGame() {
    setBoard(newTile(emptyBoard()));
  }

  function checkGameOver() {
    if (isGameOver(board)) {
      // right here we need to check to see if their score qualifies them to be saved, and then save them.
      // if they are saved, the leaderboard will have to be re-rendered after they save their name
      Alert.alert("Game over", `Your score was ${score}. Great job!`, [
        {
          text: "New Game! (wow this is un poco addicting)",
          onPress: newGame,
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          //   // once published, change to:
          //   text: "rate in app store ",
          text: "see dev's website",
          onPress: () => Linking.openURL("https://zacharydagnall.dev/"),
        },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <HeaderComponent score={score} newGame={newGame} />
      <Game setBoard={setBoard} board={board} />
      <LeaderBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
    alignItems: "center",
    justifyContent: "center",
  },
});

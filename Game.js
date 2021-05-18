import React, { useState } from "react";
import { Text, StyleSheet, View, Dimensions, Alert } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import GameCell from "./GameCell";
import {
  emptyBoard,
  newTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isGameOver,
} from "./board";

const width = Dimensions.get("window").width - 40;

function Game() {
  const [board, setBoard] = useState(newTile(emptyBoard));

  function checkGameOver() {
    if (isGameOver(board)) {
      //handle game over here. alert? more complicated? how do alerts even look on mobile lol
      //   alert("game over!");
      // here there can be a prompt to log a name to save a score if in the top 10 ("inappropriate names and their scores may be removed")
      Alert.alert("Game over", `Your score was ${"1000"}. Great job!`, [
        {
          text: "New game",
          onPress: () => console.log("new game started"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "rate in app store",
          onPress: () => console.log("app store pressed"),
        },
      ]);
    }
  }

  function left() {
    setBoard(newTile(moveLeft(board)));
    checkGameOver();
  }
  function right() {
    setBoard(newTile(moveRight(board)));
    checkGameOver();
  }
  function up() {
    setBoard(newTile(moveUp(board)));
    checkGameOver();
  }
  function down() {
    setBoard(newTile(moveDown(board)));
    checkGameOver();
  }

  return (
    <GestureRecognizer
      style={styles.screenStyle}
      onSwipeLeft={left}
      onSwipeRight={right}
      onSwipeUp={up}
      onSwipeDown={down}
    >
      <Text style={styles.header}>Fib Tiles !</Text>
      <Text style={styles.header}>Let's get fibbin</Text>
      <View style={styles.board}>
        {board.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((number, j) => (
              <GameCell key={`col-${j}`} number={number} />
            ))}
          </View>
        ))}
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 40,
    fontSize: 50,
    textAlign: "center",
    color: "olive",
    fontWeight: "bold",
  },
  board: {
    width: width,
    padding: 5,
    margin: 20,
    backgroundColor: "olive",
  },
  row: {
    flexDirection: "row",
    height: width / 5,
  },
});

export default Game;

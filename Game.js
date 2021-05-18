import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Alert, Linking } from "react-native";
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
import { phi } from "mathjs";

const width = Dimensions.get("window").width - 21 - 21;

function Game({ setScore, score }) {
  const [board, setBoard] = useState(newTile(emptyBoard()));

  useEffect(() => {
    setScore(board.score);
    checkGameOver();
  }, [board]);

  function checkGameOver() {
    if (isGameOver(board)) {
      Alert.alert("Game over", `Your score was ${score}. Great job!`, [
        {
          text: "New Game! (wow this is un poco addicting)",
          onPress: () => setBoard(newTile(emptyBoard())),
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
    <GestureRecognizer
      style={styles.screenStyle}
      onSwipeLeft={() => setBoard(newTile(moveLeft(board)))}
      onSwipeRight={() => setBoard(newTile(moveRight(board)))}
      onSwipeUp={() => setBoard(newTile(moveUp(board)))}
      onSwipeDown={() => setBoard(newTile(moveDown(board)))}
    >
      <View style={styles.board}>
        {board.board.map((row, i) => (
          <View key={`row-${i}`} style={[styles.row]}>
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
  board: {
    width: width,
    padding: 5,
    margin: 21,
    backgroundColor: "black",
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    height: width / 5,
  },
  goldenRow: {
    height: width / phi / 5,
  },
});

export default Game;

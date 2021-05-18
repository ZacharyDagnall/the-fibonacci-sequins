import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
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
  }, [board]);

  function checkGameOver() {
    if (isGameOver(board)) {
      Alert.alert("Game over", `Your score was ${score}. Great job!`, [
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
    checkGameOver(); //refactor by putting this into the useEffect and then the prev line in-line in 67
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

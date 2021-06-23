import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import GameCell from "./GameCell";
import {
  newTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  hasBad,
} from "./board";
import { PHI } from "./additionalMath";

const width = Dimensions.get("window").width - 21 - 21;

function Game({ board, setBoard }) {
  function left() {
    if (hasBad(board)) {
      setBoard(newTile(moveRight(board)));
    } else {
      setBoard(newTile(moveLeft(board)));
    }
  }
  function right() {
    if (hasBad(board)) {
      setBoard(newTile(moveLeft(board)));
    } else {
      setBoard(newTile(moveRight(board)));
    }
  }
  function up() {
    if (hasBad(board)) {
      setBoard(newTile(moveDown(board)));
    } else {
      setBoard(newTile(moveUp(board)));
    }
  }
  function down() {
    if (hasBad(board)) {
      setBoard(newTile(moveUp(board)));
    } else {
      setBoard(newTile(moveDown(board)));
    }
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
    margin: 13,
    backgroundColor: "black",
    borderRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    height: width / 5,
  },
  goldenRow: {
    height: width / PHI() / 5,
  },
});

export default Game;

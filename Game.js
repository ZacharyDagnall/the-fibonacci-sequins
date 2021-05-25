import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import GameCell from "./GameCell";
import { newTile, moveLeft, moveRight, moveUp, moveDown } from "./board";
import { PHI } from "./additionalMath";

const width = Dimensions.get("window").width - 21 - 21;

function Game({ board, setBoard }) {
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

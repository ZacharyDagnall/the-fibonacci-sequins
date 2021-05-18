import React from "react";
import { Text, StyleSheet, View } from "react-native";

function GameCell({ number }) {
  return (
    <View style={[styles.cellStyle, styles[`cell${number}`]]}>
      <Text style={styles.textStyle}>{number > 0 ? number : ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cellStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  cell1: {
    backgroundColor: "orange",
  },
  cell2: {
    backgroundColor: "rgb(39, 207, 207)",
  },
  cell3: {
    backgroundColor: "pink",
  },
  cell5: {
    backgroundColor: "gold",
  },
  cell8: {
    backgroundColor: "greenyellow",
  },
  cell13: {
    backgroundColor: "#e9c46a",
  },
  cell21: {
    backgroundColor: "goldenrod",
  },
  cell34: {
    backgroundColor: "rebeccapurple",
  },
  cell55: {
    backgroundColor: "cyan",
  },
  cell89: {
    backgroundColor: "gold",
  },
  cell144: {
    backgroundColor: "aquamarine",
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default GameCell;

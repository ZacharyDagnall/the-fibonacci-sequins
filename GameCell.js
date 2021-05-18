import React from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import ruby from "./ruby.png";
import lapis from "./lapis.png";
import lightgreen from "./lightgreen.png";
import rosequartz from "./rosequartz.png";
import steelblue from "./steelblue.png";
import teal from "./teal.png";
import peridot from "./peridot.png";
import amethyst from "./amethyst.png";

const sequins = {
  1: ruby,
  2: lapis,
  3: lightgreen,
  5: rosequartz,
  8: steelblue,
  13: teal,
  21: peridot,
  34: amethyst,
};

function GameCell({ number }) {
  return (
    <View style={[styles.cellStyle]}>
      {number > 0 ? (
        <ImageBackground
          style={styles.backgroundImage}
          source={sequins[number] || ruby}
        >
          <Text style={styles.textStyle}>{number > 0 ? number : ""}</Text>
        </ImageBackground>
      ) : (
        <Text style={styles.textStyle}>{number > 0 ? number : ""}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cellStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
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
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

export default GameCell;

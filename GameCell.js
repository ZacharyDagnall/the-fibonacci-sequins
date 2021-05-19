import React from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import black from "./black.png";
import blue from "./blue.png";
import cyan from "./cyan.png";
import darkBlue from "./darkBlue.png";
import darkGreen from "./darkGreen.png";
import darkOrange from "./darkOrange.png";
import darkPurple from "./darkPurple.png";
import darkRed from "./darkRed.png";
import green from "./green.png";
import lavendar from "./lavendar.png";
import lightBlue from "./lightBlue.png";
import lightGray from "./lightGray.png";
import lightGreen from "./lightGreen.png";
import lightLimeGreen from "./lightLimeGreen.png";
import lightOrange from "./lightOrange.png";
import limeGreen from "./limeGreen.png";
import magenta from "./magenta.png";
import orange from "./orange.png";
import pink from "./pink.png";
import purple from "./purple.png";
import red from "./red.png";
import yellow from "./yellow.png";

const sequins = {
  0: black,
  1: red,
  2: blue,
  3: lightGreen,
  5: lavendar,
  8: lightOrange,
  13: darkBlue,
  21: yellow,
  34: darkGreen,
  55: darkRed,
  89: purple,
  144: lightBlue,
  233: lightLimeGreen,
  377: orange,
  610: green,
  987: darkPurple,
  1597: magenta,
  2584: cyan,
  4181: limeGreen,
  6765: pink,
  10946: darkOrange,
  17711: lightGray,
  28657: red,
  46368: blue,
  75025: lightGreen,
  121393: lavendar,
  196418: lightOrange,
  317811: darkBlue,
};

function GameCell({ number }) {
  return (
    <View style={[styles.cellStyle]}>
      {number > 0 ? (
        <ImageBackground
          style={styles.backgroundImage}
          source={sequins[number] || red}
        >
          <Text
            style={
              number < 144
                ? styles.textStyle
                : [styles.textStyle, styles.tripsDigitText]
            }
          >
            {number > 0 ? number : ""}
          </Text>
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
  textStyle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  tripsDigitText: {
    fontSize: 21,
  },
});

export default GameCell;

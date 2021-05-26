import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

const TitleScreen = ({ setIsTitleScreen, setIsNameSubmitted }) => {
  const [playBTNpressed, setPlayBTNpressed] = useState(false);
  return (
    <View>
      <View style={styles.marginBottom}>
        <Text style={styles.header}>The</Text>
        <Text style={styles.header}>Fibonacci</Text>
        <Text style={styles.header}>Sequins</Text>
      </View>
      <Pressable
        style={
          playBTNpressed ? [styles.button, styles.buttonPressed] : styles.button
        }
        onPress={() => {
          setIsTitleScreen(false);
          setIsNameSubmitted(false);
        }}
        onPressIn={() => setPlayBTNpressed(true)}
        onPressOut={() => setPlayBTNpressed(false)}
      >
        <Text style={styles.buttonText}>Play Game!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 0,
    fontSize: 55,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontFamily: "Copperplate",
    textShadowColor: "rgba(233, 233, 233, 1)",
    textShadowOffset: { width: -1, height: 3 },
    textShadowRadius: 1,
  },
  button: {
    borderRadius: 21,
    padding: 13,
    elevation: 2,
    backgroundColor: "#2196F3",
    alignSelf: "center",
    marginTop: 34,
    borderColor: "navy",
    borderWidth: 1,
  },
  buttonPressed: {
    backgroundColor: "magenta",
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    textShadowColor: "navy",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});

export default TitleScreen;

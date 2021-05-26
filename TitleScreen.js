import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

const TitleScreen = ({ setIsTitleScreen, setIsNameSubmitted }) => {
  return (
    <View>
      <View style={styles.marginBottom}>
        <Text style={styles.header}>The</Text>
        <Text style={styles.header}>Fibonacci</Text>
        <Text style={styles.header}>Sequins!</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          setIsTitleScreen(false);
          setIsNameSubmitted(false);
        }}
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
    textShadowColor: "rgba(255, 255, 255, 1)",
    textShadowOffset: { width: -1, height: 3 },
    textShadowRadius: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    alignSelf: "center",
    marginTop: 34,
    // shadowColor: "rgba(255, 255, 255, 1)",
    // shadowOffset: { width: -1, height: 3 },
    // shadowRadius: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
  },
});

export default TitleScreen;

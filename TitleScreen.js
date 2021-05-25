import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

const TitleScreen = ({ setIsTitleScreen }) => {
  return (
    <View>
      <Text style={styles.header}>The Fibonacci Sequins!</Text>
      <Pressable style={styles.button} onPress={() => setIsTitleScreen(false)}>
        <Text>Play Game!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 8,
    fontSize: 34,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    alignSelf: "center",
  },
});

export default TitleScreen;

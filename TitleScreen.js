import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

const TitleScreen = ({ setIsTitleScreen }) => {
  return (
    <View>
      <View style={styles.marginBottom}>
        <Text style={styles.header}>The</Text>
        <Text style={styles.header}>Fibonacci</Text>
        <Text style={styles.header}>Sequins!</Text>
      </View>
      <Pressable style={styles.button} onPress={() => setIsTitleScreen(false)}>
        <Text style={styles.buttonText}>Play Game!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  //   headerContainer: {
  //     marginBottom: 34,
  //   },
  header: {
    margin: 0,
    fontSize: 55,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontFamily: "Copperplate",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    alignSelf: "center",
    marginTop: 34,
  },
  buttonText: {
    color: "white",
    fontSize: 21,
  },
});

export default TitleScreen;

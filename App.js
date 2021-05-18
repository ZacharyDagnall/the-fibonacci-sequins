import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Game from "./Game";
import HeaderComponent from "./HeaderComponent";
import LeaderBoard from "./LeaderBoard";

export default function App() {
  const [score, setScore] = useState(0);
  return (
    <View style={styles.container}>
      <HeaderComponent score={score} />
      <Game setScore={setScore} score={score} />
      <LeaderBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
    alignItems: "center",
    justifyContent: "center",
  },
});

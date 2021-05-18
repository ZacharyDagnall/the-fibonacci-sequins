import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
const indices = [1, 1, 2, 3, 5, 8, 13, 21];

function LeaderBoard({ toppers }) {
  toppers = [
    { name: "Bingo", score: 9000 },
    { name: "Bongo", score: 3421 },
    { name: "Fibonacci Himself", score: 144 },
    { name: "Vizzini", score: 34 },
    { name: "Caesar", score: 21 },
    { name: "Thing 1", score: 13 },
    { name: "Thing 2", score: 8 },
    { name: "Robin Sparkles", score: 5 },
  ];
  return (
    <View>
      {toppers.map((t, i) => {
        return (
          <Text key={i}>
            {indices[i]}. {t.name}: {t.score}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 3,
    fontSize: 8,
  },
});

export default LeaderBoard;

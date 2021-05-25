import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
const indices = [1, 1, 2, 3, 5, 8, 13, 21];

function LeaderBoard({ api, isTitleScreen }) {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    fetch(`${api}/scores/leaderboard`)
      .then((r) => r.json())
      .then((data) => {
        // console.log("leader data", data);
        setLeaders(data);
      })
      .catch((er) => setLeaders([er.message]));
  }, [isTitleScreen]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard:</Text>
      {leaders.map((t, i) => {
        return (
          <Text key={i} style={styles.item}>
            {t.rank}. {t.name}: {t.score}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
  },
  header: {
    fontSize: 21,
    fontFamily: "Copperplate",
  },
  item: {
    padding: 1,
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Georgia",
  },
});

export default LeaderBoard;

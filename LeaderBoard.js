import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
const indices = [1, 1, 2, 3, 5, 8, 13, 21];

function LeaderBoard({ api, stb }) {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    fetch(`${api}/scores/leaderboard`)
      .then((r) => r.json())
      .then((data) => {
        console.log("leader data", data);
        setLeaders(data);
      })
      .catch((er) => setLeaders([er.message]));
  }, []);

  return (
    <View>
      <Text>Leaderboard:</Text>
      {leaders.map((t, i) => {
        return (
          <Text key={i}>
            {t.rank}. {t.name}: {t.score}
          </Text>
        );
      })}
      <Text>
        You have to score at least {stb.score} to beat {stb.name} and join the
        leaderboard.
      </Text>
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

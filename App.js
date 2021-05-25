import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TextInput,
  Pressable,
  View,
  Alert,
  Linking,
} from "react-native";
import Game from "./Game";
import HeaderComponent from "./HeaderComponent";
import LeaderBoard from "./LeaderBoard";
import { emptyBoard, newTile, isGameOver } from "./board";
import { ordinal } from "./additionalMath";
import TitleScreen from "./TitleScreen";

export default function App() {
  const [isTitleScreen, setIsTitleScreen] = useState(true);
  const [board, setBoard] = useState(newTile(emptyBoard()));
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [quitModalVisible, setQuitModalVisible] = useState(false);
  const api = "http://192.168.1.18:3001";

  useEffect(() => {
    setScore(board.score);
    checkGameOver();
  }, [board]);

  //maybe i can make this a dynamic url with : param in it, and fetch the *next* score to beat. Refetch if they pass
  const [stb, setSTB] = useState({ rank: 0, name: "", score: 0 });
  useEffect(() => {
    fetch(`${api}/scores/scoreToBeat`)
      .then((r) => r.json())
      .then((data) => {
        console.log("score to beat", data);
        setSTB(data);
      });
  }, []);

  //i think i only want to do this when they quit or lose. Otherwise 1000 fetches
  function submitName() {
    setQuitModalVisible(false);
    fetch(`${api}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "applications/json",
      },
      body: JSON.stringify({ name: name, score: score }),
    }).then(() => setIsTitleScreen(true));
  }

  function newGame() {
    setBoard(newTile(emptyBoard()));
  }

  function quitGame() {
    if (scoreQualifies()) {
      setQuitModalVisible(true);
    } else {
      setIsTitleScreen(true);
    }
  }

  useEffect(() => {
    setBoard(newTile(emptyBoard()));
  }, [isTitleScreen]);

  function scoreQualifies() {
    return score > stb.score;
  }

  function checkGameOver() {
    if (isGameOver(board)) {
      // right here we need to check to see if their score qualifies them to be saved, and then save them.
      if (scoreQualifies()) {
        // think this might have to be a modal instead, in order to grab name input
        //
        // Alert.alert(
        //   "Game Over",
        //   `You scored high enough to join the leaderboard! Enter your name to save your score.`,
        //   [
        //     {
        //       // enter name to be saved.
        //       //onPress: submitName
        //     },
        //     {},
        //   ]
        // );
      }
      // if they are saved, the leaderboard will have to be re-rendered after they save their name
      else {
        Alert.alert(
          "Game over",
          `Your score was ${score}. Next time try to make the leaderboard!`,
          [
            {
              text: "New Game! (wow this is un poco addicting)",
              onPress: newGame,
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              //   // once published, change to:
              //   text: "rate in app store ",
              text: "see dev's website",
              onPress: () => Linking.openURL("https://zacharydagnall.dev/"),
            },
          ]
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      {isTitleScreen && !quitModalVisible ? (
        <TitleScreen setIsTitleScreen={setIsTitleScreen} />
      ) : (
        <>
          <HeaderComponent
            score={score}
            newGame={newGame}
            quitGame={quitGame}
          />

          <Game setBoard={setBoard} board={board} />
          <LeaderBoard api={api} stb={stb} />
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={quitModalVisible}
        onRequestClose={() => {
          setQuitModalVisible(!quitModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>
              You scored high enough to join the leaderboard! Enter your name to
              save your score.
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="enter name"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={submitName}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

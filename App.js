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
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const api = "http://192.168.1.18:3001";

  useEffect(() => {
    setScore(board.score);
    checkGameOver();
  }, [board]);

  const [stb, setSTB] = useState({ rank: 0, name: "", score: 0 });
  useEffect(() => {
    fetch(`${api}/scores/scoreToBeat`)
      .then((r) => r.json())
      .then((data) => {
        console.log("score to beat", data);
        setSTB(data);
      })
      .catch((er) => console.log("STB error: ", er.message));
  }, [isTitleScreen]);

  function submitName() {
    fetch(`${api}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "applications/json",
      },
      body: JSON.stringify({ name: name, score: score }),
    }).then(() => setIsNameSubmitted(true));
  }

  function newGame() {
    setBoard(newTile(emptyBoard()));
    setScore(0);
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
    setScore(0);
  }, [isTitleScreen]);

  function scoreQualifies() {
    // return true;
    return score > 1;
    return score > stb.score;
  }

  function checkGameOver() {
    // if (isGameOver(board)) {
    if (score > 1) {
      // if (true) {
      setGameOverModalVisible(true);
    }
  }

  // function doNothing() {}

  return (
    <View style={styles.container}>
      {isTitleScreen && !quitModalVisible ? (
        <TitleScreen
          setIsTitleScreen={setIsTitleScreen}
          setIsNameSubmitted={setIsNameSubmitted}
        />
      ) : (
        <>
          <HeaderComponent
            score={score}
            newGame={newGame}
            quitGame={quitGame}
          />
          <Game setBoard={setBoard} board={board} />
          <LeaderBoard api={api} isTitleScreen={isTitleScreen} />
        </>
      )}
      {/* Quit Game Modal */}
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
            <Text style={styles.modalText}>
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
              style={styles.button}
              onPress={() => {
                submitName();
                setQuitModalVisible(false);
                setIsTitleScreen(true);
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Game Over Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={gameOverModalVisible}
        onRequestClose={() => {
          setGameOverModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, styles.gameOver]}>Game Over!</Text>
            {scoreQualifies() && !isNameSubmitted ? (
              <View style={styles.nameContainer}>
                <Text style={styles.modalText}>
                  Great job! You scored high enough to join the leaderboard!
                  Enter your name to save your score.
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  value={name}
                  placeholder="enter name"
                />
                <Pressable style={styles.button} onPress={submitName}>
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            ) : null}
            <Pressable
              style={[styles.button, styles.gameOverButton]}
              onPress={() => {
                newGame();
                setGameOverModalVisible(false);
                setIsNameSubmitted(false);
              }}
            >
              <Text style={styles.textStyle}>New Game</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.gameOverButton]}
              onPress={() => {
                setIsTitleScreen(true);
                setGameOverModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Quit</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.gameOverButton]}
              onPress={() => Linking.openURL("https://zacharydagnall.dev/")}
            >
              <Text style={styles.textStyle}>Rate in App Store</Text>
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
  nameContainer: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
  },
  modalView: {
    margin: 21,
    backgroundColor: "white",
    borderRadius: 21,
    padding: 21,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    borderRadius: 21,
    padding: 5,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  gameOverButton: {
    margin: 5,
    width: 233,
    borderRadius: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 13,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Copperplate",
  },
  gameOver: {
    fontSize: 21,
  },
  input: {
    height: 55,
    width: 233,
    margin: 13,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 21,
    backgroundColor: "lightgrey",
  },
});

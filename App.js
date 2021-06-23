import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TextInput,
  Pressable,
  View,
  Linking,
  ImageBackground,
  Dimensions,
} from "react-native";
import collage from "./collage.png";
import Game from "./Game";
import HeaderComponent from "./HeaderComponent";
import LeaderBoard from "./LeaderBoard";
import { emptyBoard, newTile, isGameOver } from "./board";
import TitleScreen from "./TitleScreen";
import { isNameOkay } from "./inappropriate";
const height = Dimensions.get("window").height;

export default function App() {
  const [isTitleScreen, setIsTitleScreen] = useState(true);
  const [isHardMode, setIsHardMode] = useState(false);
  const [board, setBoard] = useState(newTile(emptyBoard()));
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [quitModalVisible, setQuitModalVisible] = useState(false);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
  const [youSureQuitModalVisible, setYouSureQuitModalVisible] = useState(false);
  const [youSureNewModalVisible, setYouSureNewModalVisible] = useState(false);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [inappropriateNameMessageOn, turnInappopriateNameMessageOn] =
    useState(false);
  //if i turned pressables into custom components i shouldnt have to use a separate state for each of these. Should come back to clean these up.
  const [nahBTNpressed, setNahBTNpressed] = useState(false);
  const [yeahBTNpressed, setYeahBTNpressed] = useState(false);
  const [GOnewBTNPressed, setGOnewBTNpressed] = useState(false);
  const [GOquitBTNPressed, setGOquitBTNpressed] = useState(false);
  const [GOrateBTNPressed, setGOrateBTNpressed] = useState(false);
  const [xBTNpressed, setxBTNpressed] = useState(false);
  const [submitBTNpressed, setSubmitBTNpressed] = useState(false);
  const api = "https://fibonacci-sequins-sbackend.herokuapp.com";

  useEffect(() => {
    setBoard(newTile(emptyBoard(isHardMode)));
  }, [isHardMode]);

  useEffect(() => {
    setScore(board.score);
    checkGameOver();
  }, [board]);

  const [stb, setSTB] = useState({ rank: 0, name: "", score: 0 });
  useEffect(() => {
    fetch(`${api}/scores/scoreToBeat`)
      .then((r) => r.json())
      .then((data) => {
        setSTB(data);
      })
      .catch((er) => console.log("STB error: ", er.message));
  }, [isTitleScreen]);

  function submitNameForm(from) {
    if (isNameOkay(name)) {
      submitName();
      if (from === "quit") {
        setQuitModalVisible(false);
        setIsTitleScreen(true);
      }
    } else {
      turnInappopriateNameMessageOn(true);
    }
  }

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
    newGame();
  }, [isTitleScreen]);

  function scoreQualifies() {
    // return true;
    return score > stb.score;
  }

  function checkGameOver() {
    if (isGameOver(board)) {
      // if (score > 10) {
      setGameOverModalVisible(true);
    }
  }

  // function doNothing() {}

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={collage}
        blurRadius={isTitleScreen ? 0 : 13}
      >
        {isTitleScreen && !quitModalVisible ? (
          <TitleScreen
            setIsTitleScreen={setIsTitleScreen}
            setIsNameSubmitted={setIsNameSubmitted}
            setIsHardMode={setIsHardMode}
          />
        ) : (
          <>
            <HeaderComponent
              score={score}
              newGame={() => setYouSureNewModalVisible(true)}
              quitGame={() => setYouSureQuitModalVisible(true)}
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
                You scored {score} points, which is high enough to join the
                leaderboard! Enter your name to save your score.
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={(e) => {
                  setName(e);
                  turnInappopriateNameMessageOn(false);
                }}
                value={name}
                placeholder="enter name (limit 25 char)"
              />
              {inappropriateNameMessageOn ? (
                <Text style={styles.badNameText}>
                  Please choose another name
                </Text>
              ) : null}
              <Pressable
                style={
                  yeahBTNpressed
                    ? [styles.button, styles.yeahButtonPressed]
                    : styles.button
                }
                onPress={() => {
                  submitNameForm("quit");

                  setYeahBTNpressed(false);
                }}
                onPressIn={() => setYeahBTNpressed(true)}
                onPressOut={() => setYeahBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={
                  nahBTNpressed
                    ? [styles.button, styles.nahButton, styles.nahButtonPressed]
                    : [styles.button, styles.nahButton]
                }
                onPress={() => {
                  setQuitModalVisible(false);
                  setIsTitleScreen(true);
                  setNahBTNpressed(false);
                }}
                onPressIn={() => setNahBTNpressed(true)}
                onPressOut={() => setNahBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Nah We Good</Text>
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
              <Pressable
                style={
                  xBTNpressed
                    ? [styles.button, styles.Xbutton, styles.XbuttonPressed]
                    : [styles.button, styles.Xbutton]
                }
                onPress={() => {
                  setGameOverModalVisible(false);
                  setxBTNpressed(false);
                }}
                onPressIn={() => setxBTNpressed(true)}
                onPressOut={() => setxBTNpressed(false)}
              >
                <Text style={[styles.textStyle, styles.XbuttonText]}>X</Text>
              </Pressable>
              <Text style={[styles.modalText, styles.gameOver]}>
                Game Over!
              </Text>
              {scoreQualifies() && !isNameSubmitted ? (
                <View style={styles.nameContainer}>
                  <Text style={styles.modalText}>
                    Great job! You scored {score} points, which is high enough
                    to join the leaderboard! Enter your name to save your score.
                  </Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="enter name (limit 25 char)"
                  />
                  {inappropriateNameMessageOn ? (
                    <Text style={styles.badNameText}>
                      Please choose another name
                    </Text>
                  ) : null}

                  <Pressable
                    style={
                      submitBTNpressed
                        ? [styles.button, styles.submitButtonPressed]
                        : styles.button
                    }
                    onPress={() => {
                      submitNameForm("game over");
                      setSubmitBTNpressed(false);
                    }}
                    onPressIn={() => setSubmitBTNpressed(true)}
                    onPressOut={() => setSubmitBTNpressed(false)}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
                </View>
              ) : null}
              <Pressable
                style={
                  GOnewBTNPressed
                    ? [
                        styles.button,
                        styles.gameOverButton,
                        styles.gameOverButtonPressed,
                      ]
                    : [styles.button, styles.gameOverButton]
                }
                onPress={() => {
                  newGame();
                  setGameOverModalVisible(false);
                  setIsNameSubmitted(false);
                  setGOnewBTNpressed(false);
                }}
                onPressIn={() => setGOnewBTNpressed(true)}
                onPressOut={() => setGOnewBTNpressed(false)}
              >
                <Text style={styles.textStyle}>New Game</Text>
              </Pressable>
              <Pressable
                style={
                  GOquitBTNPressed
                    ? [
                        styles.button,
                        styles.gameOverButton,
                        styles.gameOverButtonPressed,
                      ]
                    : [styles.button, styles.gameOverButton]
                }
                onPress={() => {
                  setIsTitleScreen(true);
                  setGameOverModalVisible(false);
                  setIsNameSubmitted(false);
                  setGOquitBTNpressed(false);
                }}
                onPressIn={() => setGOquitBTNpressed(true)}
                onPressOut={() => setGOquitBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Quit</Text>
              </Pressable>
              <Pressable
                style={
                  GOrateBTNPressed
                    ? [
                        styles.button,
                        styles.gameOverButton,
                        styles.gameOverButtonPressed,
                      ]
                    : [styles.button, styles.gameOverButton]
                }
                onPress={() => {
                  Linking.openURL("https://zacharydagnall.dev/");
                  setGOrateBTNpressed(false);
                }}
                onPressIn={() => setGOrateBTNpressed(true)}
                onPressOut={() => setGOrateBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Rate in App Store</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* Quit "You Sure?" Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={youSureQuitModalVisible}
          onRequestClose={() => {
            setYouSureQuitModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to quit? You won't be able to return.
              </Text>
              <Pressable
                style={
                  yeahBTNpressed
                    ? [styles.button, styles.yeahButtonPressed]
                    : styles.button
                }
                onPress={() => {
                  setYouSureQuitModalVisible(false);
                  quitGame();

                  setYeahBTNpressed(false);
                }}
                onPressIn={() => setYeahBTNpressed(true)}
                onPressOut={() => setYeahBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Yes, we out</Text>
              </Pressable>
              <Pressable
                style={
                  nahBTNpressed
                    ? [styles.button, styles.nahButton, styles.nahButtonPressed]
                    : [styles.button, styles.nahButton]
                }
                onPress={() => {
                  setYouSureQuitModalVisible(false);
                  setNahBTNpressed(false);
                }}
                onPressIn={() => setNahBTNpressed(true)}
                onPressOut={() => setNahBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Nah you right, I'mma stay</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* New Game "You Sure?" Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={youSureNewModalVisible}
          onRequestClose={() => {
            setYouSureNewModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to start a new game? You won't be able to
                return.
              </Text>
              <Pressable
                style={
                  yeahBTNpressed
                    ? [styles.button, styles.yeahButtonPressed]
                    : styles.button
                }
                onPress={() => {
                  setYouSureNewModalVisible(false);
                  newGame();
                  setIsNameSubmitted(false);
                  setYeahBTNpressed(false);
                }}
                onPressIn={() => setYeahBTNpressed(true)}
                onPressOut={() => setYeahBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Yes, time for a change</Text>
              </Pressable>
              <Pressable
                style={
                  nahBTNpressed
                    ? [styles.button, styles.nahButton, styles.nahButtonPressed]
                    : [styles.button, styles.nahButton]
                }
                onPress={() => {
                  setYouSureNewModalVisible(false);
                  setNahBTNpressed(false);
                }}
                onPressIn={() => setNahBTNpressed(true)}
                onPressOut={() => setNahBTNpressed(false)}
              >
                <Text style={styles.textStyle}>Changed my mind, I'll stay</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <></>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: height,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  nameContainer: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    marginBottom: 8,
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
    borderColor: "lightblue",
    borderWidth: 2,
  },
  button: {
    borderRadius: 8,
    padding: 8,
    elevation: 2,
    backgroundColor: "#2196F3",
    margin: 13,
  },
  nahButton: {
    backgroundColor: "red",
  },
  nahButtonPressed: {
    marginRight: 8,
    backgroundColor: "magenta",
  },
  yeahButtonPressed: {
    marginRight: 8,
    backgroundColor: "magenta",
  },
  submitButtonPressed: {
    marginRight: 8,
    backgroundColor: "magenta",
  },
  gameOverButton: {
    margin: 5,
    width: 233,
    borderRadius: 8,
    padding: 13,
  },
  gameOverButtonPressed: {
    backgroundColor: "magenta",
    borderRadius: 21,
  },
  Xbutton: {
    alignSelf: "flex-end",
    padding: 5,
    margin: 0,
    backgroundColor: "#720e9e",
  },
  XbuttonPressed: {
    marginRight: 8,
    backgroundColor: "magenta",
  },
  XbuttonText: {
    color: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
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
    height: 34,
    width: 233,
    margin: 13,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 13,
    backgroundColor: "#E8E8E8",
  },
  badNameText: {
    fontSize: 13,
    color: "red",
  },
});

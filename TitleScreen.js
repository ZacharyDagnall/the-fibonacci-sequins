import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, Modal } from "react-native";

const TitleScreen = ({
  setIsTitleScreen,
  setIsNameSubmitted,
  setIsHardMode,
}) => {
  const [playBTNpressed, setPlayBTNpressed] = useState(false);
  const [modeModalVisible, setModeModalVisible] = useState(false);
  return (
    <View>
      <View style={styles.marginBottom}>
        <Text style={styles.header}>The</Text>
        <Text style={styles.header}>Fibonacci</Text>
        <Text style={styles.header}>Sequins</Text>
      </View>
      <Pressable
        style={
          playBTNpressed ? [styles.button, styles.buttonPressed] : styles.button
        }
        onPress={() => {
          setModeModalVisible(true);
        }}
        onPressIn={() => setPlayBTNpressed(true)}
        onPressOut={() => setPlayBTNpressed(false)}
      >
        <Text style={styles.buttonText}>Play Game!</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modeModalVisible}
        onRequestClose={() => {
          setModeModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Game Mode</Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                setIsTitleScreen(false);
                setIsNameSubmitted(false);
                setIsHardMode(false);
              }}
              // onPressIn={() => {}}
              // onPressOut={() => {}}
            >
              <Text style={styles.textStyle}>Easy Mode</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                setIsTitleScreen(false);
                setIsNameSubmitted(false);
                setIsHardMode(true);
              }}
              // onPressIn={() => {}}
              // onPressOut={() => {}}
            >
              <Text style={styles.textStyle}>Hard Mode</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    textShadowColor: "rgba(233, 233, 233, 1)",
    textShadowOffset: { width: -1, height: 3 },
    textShadowRadius: 1,
  },
  button: {
    borderRadius: 21,
    padding: 13,
    elevation: 2,
    backgroundColor: "#2196F3",
    alignSelf: "center",
    marginTop: 34,
    borderColor: "navy",
    borderWidth: 1,
  },
  buttonPressed: {
    backgroundColor: "magenta",
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 21,
    fontWeight: "bold",
    textShadowColor: "navy",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
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
  modalText: {
    marginBottom: 13,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Copperplate",
  },
});

export default TitleScreen;

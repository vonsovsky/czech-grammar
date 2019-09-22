import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ToastAndroid
} from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";

import GrammarParser from "../modules/GrammarParser.js";

const MAXIMUM_EXAMPLES = 20; // 0 for unlimited

export default class GameScreen extends React.Component {
  state = {
    originalText: "",
    featuredText: "",
    legend: "",
    required_letters: [],
    available_letters: [],
    required_count: 0,
    processed_count: 0,

    correct: 0,
    incorrect: 0,
    phraseIsCorrect: true,
    correctInRow: 0,
    correctInTotal: 0,
    totalInRow: 0
  };

  constructor(props) {
    super(props);

    datasource = this._selectModule(this.props.navigation.getParam("module"));
    this.parser = new GrammarParser(datasource);
    this.phrases = this.parser.parsePhrases();
  }

  _selectModule(module) {
    switch (module) {
      case "iy":
        return require("../assets/iy.json");
      case "sz":
        return require("../assets/sz.json");
      case "mevebe":
        return require("../assets/mevebe.json");
      case "uu":
        return require("../assets/uu.json");
    }

    console.log("Unsupported module was requested: " + module);
    return "";
  }

  _saveSelectedPhrase(phraseIndex) {
    this.setState({
      required_letters: phrases[phraseIndex]["required"],
      available_letters: phrases[phraseIndex]["groups"],
      required_count: phrases[phraseIndex]["required"].length,
      featuredText: phrases[phraseIndex]["featured"],
      originalText: phrases[phraseIndex]["line"],
      legend: phrases[phraseIndex]["legend"],
      processed_count: 0
    });
  }

  _wrapPhraseInHTML(phrase) {
    return (
      '<div style="text-align: center; font-size: 70px;">' + phrase + "</div"
    );
  }

  _selectRandomText() {
    var datasize = phrases.length;
    var randomIndex = Math.floor(Math.random() * datasize);
    this._saveSelectedPhrase(randomIndex);
    this._saveLastPhrase(randomIndex);
  }

  componentWillMount() {
    this._retrieveData();
  }

  _insertAtIndex(text, index, insertText) {
    return text
      .substring(0, index)
      .concat(insertText)
      .concat(text.substring(index + 1));
  }

  _today() {
    date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  _retrieveData = async () => {
    try {
      const today = this._today();

      const corrects = await AsyncStorage.getItem("@cor:" + today);
      const incorrects = await AsyncStorage.getItem("@inc:" + today);
      const unfinishedPhraseIndex = await AsyncStorage.getItem(
        "@settings:phrase_index"
      );

      if (corrects !== null) {
        this.state.correct = parseInt(corrects);
        this.state.incorrect = parseInt(incorrects);
      }

      if (
        unfinishedPhraseIndex === null ||
        unfinishedPhraseIndex === -1 ||
        unfinishedPhraseIndex >= this.phrases.length
      ) {
        this._selectRandomText();
      } else {
        this._saveSelectedPhrase(unfinishedPhraseIndex);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Nemohu načíst skóre");
    }
  };

  _storeData = async () => {
    try {
      const today = this._today();
      await AsyncStorage.setItem(
        "@cor:" + today,
        this.state.correct.toString()
      );
      await AsyncStorage.setItem(
        "@inc:" + today,
        this.state.incorrect.toString()
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Nemohu uložit skóre");
    }
  };

  _saveLastPhrase = async phraseIndex => {
    try {
      await AsyncStorage.setItem(
        "@settings:phrase_index",
        phraseIndex.toString()
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Nemohu ukládat");
    }
  };

  _onPickedSelection(order) {
    currentIndex = this.state.processed_count;
    selectedLetter = this.state.available_letters[currentIndex * 2 + order];
    requiredLetter = this.state.required_letters[currentIndex];

    correct = this.state.correct;
    incorrect = this.state.incorrect;
    phraseIsCorrect = this.state.phraseIsCorrect;

    if (selectedLetter == requiredLetter) {
      correct++;
      fontColor = "green";
    } else {
      incorrect++;
      phraseIsCorrect = false;
      fontColor = "red";
    }

    if (this.parser.showFirstLetter()) {
      selectedLetter = selectedLetter.substring(1);
    }

    featuredText = this.state.featuredText;
    replacingIndex = featuredText.indexOf("_");
    featuredText = this._insertAtIndex(
      featuredText,
      replacingIndex,
      "<font color='" + fontColor + "'>" + selectedLetter + "</font>"
    );

    this._storeData();
    if (this.state.processed_count + 1 == this.state.required_count) {
      this._onFinishedPhrase(phraseIsCorrect);
      phraseIsCorrect = true;
    }

    this.setState({
      processed_count: currentIndex + 1,
      featuredText: featuredText,
      correct: correct,
      incorrect: incorrect,
      phraseIsCorrect: phraseIsCorrect
    });
  }

  _onFinishedPhrase(phraseIsCorrect) {
    correctInRow = this.state.correctInRow;
    correctInTotal = this.state.correctInTotal;

    if (phraseIsCorrect) {
      correctInRow++;
      correctInTotal++;
    } else {
      correctInRow = 0;
    }

    console.log("Show legend: " + this.state.legend);

    toastText = this._getMotivationalText(correctInRow);
    if (toastText.length > 0) {
      ToastAndroid.showWithGravityAndOffset(
        toastText,
        3,
        ToastAndroid.BOTTOM,
        0,
        600
      );
    }

    this._saveLastPhrase("");
    this.setState({
      correctInRow: correctInRow,
      correctInTotal: correctInTotal,
      totalInRow: this.state.totalInRow + 1
    });
  }

  _getMotivationalText(correctInRow) {
    text = "";
    if (correctInRow == 0) {
      wrongs = [
        "Příště budeš lepší.",
        "Ne vždy to vyjde.",
        "Trénuj a zlepšíš se.",
        "Tak snad dáš to další.",
        "Snaž se víc!"
      ];
      index = Math.floor(Math.random() * wrongs.length);
      text = wrongs[index];
    } else if (correctInRow % 100 == 0) {
      text = "Češtinář. Lituju tě.";
    } else if (correctInRow % 50 == 0) {
      text = "Boží!";
    } else if (correctInRow % 20 == 0) {
      text = "Pokračuj, mistře!";
    } else if (correctInRow % 10 == 0) {
      text = "Jdi do toho!";
    } else if (correctInRow % 5 == 0) {
      text = "Výborně!";
    } else if (correctInRow % 3 == 0) {
      text = "Jen tak dál.";
    } else {
      text = "Správně.";
    }

    return text;
  }

  _pickButtonText(order) {
    if (this.state.processed_count < this.state.required_count) {
      return this.state.available_letters[
        this.state.processed_count * 2 + order
      ];
    }
    return "";
  }

  _onPressNext() {
    this._selectRandomText();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.scoreText}>
            <Text style={{ color: "green" }}>
              {this.state.correctInTotal} /{" "}
            </Text>
            <Text style={{ color: "red" }}>
              {this.state.totalInRow - this.state.correctInTotal}
            </Text>
            {MAXIMUM_EXAMPLES > 0 && <Text> z celkem {MAXIMUM_EXAMPLES}</Text>}
          </Text>
          <WebView
            ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            originWhitelist={["*"]}
            source={{ html: this._wrapPhraseInHTML(this.state.featuredText) }}
          />
        </View>

        {this.state.processed_count == this.state.required_count && (
          <View style={styles.legendContainer}>
            <Text style={styles.legendText}>legend dummy text</Text>
          </View>
        )}

        {this.state.processed_count < this.state.required_count && (
          <View style={styles.iButtonsContainer}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => this._onPickedSelection(0)}
                style={styles.button}
              >
                <ImageBackground
                  source={require("../assets/images/ButtonShape.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                >
                  <View style={styles.buttonTextWrapper}>
                    <Text style={styles.buttonText}>
                      {this._pickButtonText(0)}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => this._onPickedSelection(1)}
                style={styles.button}
              >
                <ImageBackground
                  source={require("../assets/images/ButtonShape.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                >
                  <View style={styles.buttonTextWrapper}>
                    <Text style={styles.buttonText}>
                      {this._pickButtonText(1)}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {this.state.processed_count == this.state.required_count &&
          !(
            MAXIMUM_EXAMPLES > 0 && this.state.totalInRow >= MAXIMUM_EXAMPLES
          ) && (
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity
                onPress={() => this._onPressNext()}
                style={styles.button}
              >
                <ImageBackground
                  source={require("../assets/images/ButtonShape.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                >
                  <View style={styles.buttonTextWrapper}>
                    <Text style={styles.buttonText}>Další</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        {this.state.processed_count == this.state.required_count &&
          MAXIMUM_EXAMPLES > 0 &&
          this.state.totalInRow >= MAXIMUM_EXAMPLES && (
            <View style={styles.iButtonsContainer}>
              <View style={styles.buttonsContainer}>
                <Text
                  style={[
                    styles.textContainer,
                    styles.scoreText,
                    styles.bigMargin
                  ]}
                >
                  Gratuluji!
                </Text>
              </View>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  textStyle: {
    flex: 1
  },
  iButtonsContainer: {
    flex: 1,
    flexDirection: "row"
  },
  nextButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  buttonTextWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  nextButton: {},
  button: {
    height: 500,
    width: 190,
    alignItems: "center"
  },
  bigMargin: {
    marginTop: 50
  },
  scoreText: {
    textAlign: "center",
    fontSize: 30,
    flex: 1,
    marginTop: 10
  },
  legendContainer: {},
  legendText: {
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 20
  }
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends React.Component {
  state = {
    correctsToday: 0,
    incorrectsToday: 0,
    corrects: 0,
    incorrects: 0
  };

  _retrieveDataByKeys = async (corKeys, incKeys) => {
    try {
      const corrects = await AsyncStorage.multiGet(corKeys);
      const incorrects = await AsyncStorage.multiGet(incKeys);

      correct = 0;
      corrects.forEach(function(item) {
        correct += parseInt(item[1]);
      });

      incorrect = 0;
      incorrects.forEach(function(item) {
        incorrect += parseInt(item[1]);
      });

      this.setState({
        corrects: correct,
        incorrects: incorrect
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Nemohu načíst skóre");
    }
  };

  _retrieveData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const today = this._today();

      let correctsToday = await AsyncStorage.getItem("@cor:" + today);
      let incorrectsToday = await AsyncStorage.getItem("@inc:" + today);

      if (typeof(correctsToday) === "undefined" || correctsToday === null) {
        correctsToday = 0;
      }
      if (typeof(incorrectsToday) === "undefined" || incorrectsToday === null) {
        incorrectsToday = 0;
      }

      this.setState({
        correctsToday: correctsToday,
        incorrectsToday: incorrectsToday
      });

      let correctKeys = [];
      let incorrectKeys = [];
      allKeys.forEach(function(key) {
        if (key.substring(1, 4) == "cor") {
          correctKeys.push(key);
        }
        if (key.substring(1, 4) == "inc") {
          incorrectKeys.push(key);
        }
      });

      this._retrieveDataByKeys(correctKeys, incorrectKeys);
    } catch (error) {
      console.log(error);
      Alert.alert("Nemohu načíst skóre");
    }
  };

  _showEvaluation(pct) {
    if (pct < 60) {
      return "Nedostatečně. Než se z tebe stane mistr jazyka českého, je třeba ještě ujít dlouhou cestu.";
    } else if (pct < 70) {
      return "Dostatečně. Je to jen tak tak. Musíš hodně přidat!";
    } else if (pct < 80) {
      return "Dobře. Není to nejhorší, ale ani nejlepší. Stále na sobě pracuj!";
    } else if (pct < 90) {
      return "Chvalitebně. Jsi na dobré cestě stát se znalcem českého pravopisu. Nezapomeň ještě procvičovat!";
    }

    // highest score
    return "Výborně! Tvé znalosti českého pravopisu ve vyjmenovaných slovech jsou úctyhodné. Jen tak dál!";
  }

  _calcPercentage(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (a + b == 0) {
      return 0;
    }

    return Math.round((a / (a + b)) * 100);
  }

  _today() {
    date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  componentWillMount() {
    this._retrieveData();
  }

  bannerError() {
    console.log("An error");
    return;
  }

  render() {
    return (
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.doneGoodValues}>
            Dobře dnes:
            <Text> {this.state.correctsToday}</Text>
          </Text>
          <Text style={styles.doneBadValues}>
            Špatně dnes:
            <Text> {this.state.incorrectsToday}</Text>
          </Text>
          <Text style={styles.doneGoodValues}>
            Dobře celkem:
            <Text> {this.state.corrects}</Text>
          </Text>
          <Text style={styles.doneBadValues}>
            Špatně celkem:
            <Text> {this.state.incorrects}</Text>
          </Text>
          <Text style={styles.textStyle}>
            Úspěšnost dnes:{" "}
            {this._calcPercentage(
              this.state.correctsToday,
              this.state.incorrectsToday
            )}{" "}
            %
          </Text>
          <Text style={styles.textStyle}>
            (Celkem:{" "}
            {this._calcPercentage(this.state.corrects, this.state.incorrects)}{" "}
            %)
          </Text>
        </View>
        <Text style={styles.motivationalText}>
          {this._showEvaluation(
            this._calcPercentage(this.state.corrects, this.state.incorrects)
          )}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    color: "#f00"
  },
  textStyle: {
    marginBottom: 4,
    fontSize: 30
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  doneGoodValues: {
    color: "green",
    fontSize: 30
  },
  doneBadValues: {
    color: "red",
    fontSize: 30
  },
  motivationalText: {
    marginTop: 20,
    fontSize: 30,
    marginLeft: 40
  }
});

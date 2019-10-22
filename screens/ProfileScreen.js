import React from "react";
import {
  StyleSheet,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends React.Component {
  state = {
    generatedHTML: ""
  };

  modules = {
    'iy': {'header': 'I/Y'},
    'mevebe': {'header': 'Mě/Mně Bě/Bje'},
    'sz': {'header': 'S/Z'},
    'uu': {'header': 'Ú/Ů'}
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
    } catch (error) {
      console.log(error);
      Alert.alert("Nemohu načíst skóre");
    }

    return [correct, incorrect]
  };

  _fillModulesWithScore = async (score) => {
    var _this = this;
    var today = this._today();

    score.forEach(function(element) {
      key = element[0];
      value = element[1];

      if (key.substring(1, 4) != 'cor' && key.substring(1, 4) != 'inc') {
        return;
      }

      let modulePos = key.substring(5).indexOf(":");
      let moduleName = key.substring(5, modulePos + 5);
      if (modulePos == -1 || moduleName == '') {
        return;
      }

      let saveToKey = key.substring(1, 4) == 'cor' ? 'correct' : 'incorrect';
      let date = key.substring(modulePos + 6);
      if (date == today) {
        _this.modules[moduleName][saveToKey + "_today"] = parseInt(value);
      }
      
      _this.modules[moduleName][saveToKey] += parseInt(value);
    });
  };

  _generateHTMLFromModules = async() => {
    generatedHTML = "";
    totalCorrect = 0;
    totalIncorrect = 0;
    for (let module in this.modules) {
      let percToday = this._calcPercentage(this.modules[module]['correct_today'], this.modules[module]['incorrect_today']);
      let perc = this._calcPercentage(this.modules[module]['correct'], this.modules[module]['incorrect']);
      totalCorrect += this.modules[module]['correct'];
      totalIncorrect += this.modules[module]['incorrect'];
      
      generatedHTML += this.modules[module]['header'] + "<br />";
      generatedHTML += "<font color='green'>Dobře dnes: " + this.modules[module]['correct_today'] + "</font><br />";
      generatedHTML += "<font color='red'>Špatně dnes: " + this.modules[module]['incorrect_today'] + "</font><br />";
      generatedHTML += "<font color='green'>Dobře celkem: " + this.modules[module]['correct'] + "</font><br />";
      generatedHTML += "<font color='red'>Špatně celkem: " + this.modules[module]['incorrect'] + "</font><br />";
      generatedHTML += "Úspěšnost dnes: " + percToday + " %<br />";
      generatedHTML += "(Celkem: " + perc + " %)<br />";
      generatedHTML += "<br />";
    }

    total = this._calcPercentage(totalCorrect, totalIncorrect);
    generatedHTML += "Celkem: " + total + " %<br />";
    generatedHTML += this._showEvaluation(total);
    
    this.setState({
      generatedHTML: generatedHTML,
    });

  }

  _retrieveData = async () => {
    for (let module in this.modules) {
      this.modules[module]['correct_today'] = 0;
      this.modules[module]['incorrect_today'] = 0;
      this.modules[module]['correct'] = 0;
      this.modules[module]['incorrect'] = 0;
    }

    try {
      score = null

      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          score = stores;
          this._fillModulesWithScore(score);
          this._generateHTMLFromModules();
        });
      });
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

  render() {
    return (
      <WebView
        originWhitelist={["*"]}
        source={{ html: this._wrapPhraseInHTML(this.state.generatedHTML) }}
      />
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

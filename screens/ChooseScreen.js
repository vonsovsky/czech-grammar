import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
export default class GameScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape.png")}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>I/Y</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("Game")}
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
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape.png")}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>I/Y</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape.png")}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>MeBeVe</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    height: 500,
    width: 190
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  buttonTextWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

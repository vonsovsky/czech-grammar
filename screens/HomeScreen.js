import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/GameScreenBackground.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          <View style={styles.topContainer}>
            <Image
              source={require("../assets/images/schoolboy2.0.png")}
              style={styles.schoolboyImage}
            />
          </View>

          <View style={styles.botContainer}>
            <View style={styles.buttonContainer}>
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
                    <Text style={styles.buttonText}>Zkoušení</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={styles.botButtonContainer}>
              <TouchableOpacity
                onPress={() => navigate("Profile")}
                style={styles.button}
              >
                <ImageBackground
                  source={require("../assets/images/ButtonShape.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                >
                  <View style={styles.buttonTextWrapper}>
                    <Text style={styles.buttonText}>Skóre</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer} />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  topContainer: {
    flex: 1,
    alignItems: "center"
  },

  botContainer: {
    flex: 1
  },

  schoolboyImage: {
    width: 150,
    height: 150,
    marginTop: 75
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 30
  },
  botButtonContainer: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: 30
  },
  button: {
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  buttonShape: {
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  buttonTextWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

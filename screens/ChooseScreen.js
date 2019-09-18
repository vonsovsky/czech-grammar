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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        <View style={styles.rowWrapper}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowWrapper}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => navigate("Game")}
              style={styles.button}
            >
              <ImageBackground
                source={require("../assets/images/ButtonShape_ChooseScreen.png")}
                resizeMode="contain"
                style={styles.buttonImageBackground}
              >
                <View style={styles.buttonTextWrapper}>
                  <Text style={styles.buttonText}>Další</Text>
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
  button: {},
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
  },
  nextButtonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  rowWrapper: {
    flex: 1,
    flexDirection: "column",
    width: 100,
    height: 400
  },
  buttonImageBackground: {
    width: "100%",
    height: "100%"
  }
});

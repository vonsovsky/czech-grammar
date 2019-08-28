import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChooseScreen from "../screens/ChooseScreen";

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Game: { screen: GameScreen },
  Profile: { screen: ProfileScreen },
  Choose: { screen: ChooseScreen }
});

const App = createAppContainer(MainNavigator);

export default App;

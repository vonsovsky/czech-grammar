import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import SelectScreen from "../screens/SelectScreen";
import GameScreen from "../screens/GameScreen";
import ProfileScreen from "../screens/ProfileScreen";

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Select: { screen: SelectScreen },
  Game: { screen: GameScreen },
  Profile: { screen: ProfileScreen }
});

const App = createAppContainer(MainNavigator);

export default App;

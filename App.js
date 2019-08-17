import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen'

type Props = {};
export default class App extends React.Component<Props> {

  componentDidMount() {
      SplashScreen.hide();
  }

  render() {
    return (
        <View style={styles.container}>
            <AppNavigator />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

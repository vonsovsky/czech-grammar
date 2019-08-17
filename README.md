# Czech Grammar
Exercising Czech grammar. Mainly intended for use by primary school children. Only one module - i/y - is included right now.

# Technologies

This app was written in React-Native - framework for mobile development, allowing usage of Javascript and React instead of Java. Minimum supported platform is Android 4.1, but it was tested on Android 8.1. iOS is unsupported for now.

# How to run

Install all Javascript modules

  `yarn install`

Run android emulator and then type

  `react-native run-android`

React-native is highly unstable environment, so you will probably have to manually delete `build/...` directory several times before compilation is successful. Directory name will be mentioned in error message.

# Troubleshooting

React-native brings you the joy of many things, including the whole variety of bugs and weird errors.

---

`Could not connect to development server`

Run `react-native run-android` two more times. If Metro bundler still cannot connect, try `react-native start` in another window.

---

`App has crashed`

Sometimes app can start to crash just at the beginning because of inconsistencies in javascript packages. If `react-native log-android` is not giving any message about it, `adb logcat` is the last resort to find the problem.

# Authors

Jakub Vonšovský - programmer with weird name that for some inexplicable reason sounds Russian.
                  I love programming and trying crazy things like eating octopus covered in her ink or highly unstable
                  experimental languages like React-Native.
                  You can contact me at jakub.vonsovsky@gmail.com.

Robin Popov - Did Graphics

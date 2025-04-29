# SuperShop (RN)

Point of Service React-Native app to allow additions to online shopping cart

## Description

I have made React-Native projects before as hybrid apps but I wanted to test what a full client implementation might look like

## Demo: User Flow

<img src="assets/vids/demoUse.min.gif" width="300" />

## Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding. This will ensure you have the necessary tools to run React Native apps on your system, such as Node.js, Watchman, Android Studio (for Android development), and Xcode (for iOS development).

## Dependencies

- **Node.js** (>= 14.0.0)
- **Yarn** (optional)
- **React Native CLI** (via `npm` or `yarn`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

## Installing

1. Clone this repository:

   ```
   git clone https://github.com/NateThurmond/SuperShop.git
   cd SuperShop
   ```

2. Install the dependencies:

    If you’re using npm:

    ```
    npm install
    ```

    Or if you’re using Yarn:

    ```
    yarn install
    ```

3. Install the required CocoaPods dependencies (for iOS):

    If you're targeting iOS:

    ```
    cd ios
    pod install
    cd ..
    ```
## Running the App

### For iOS
Start the Metro bundle

    npx react-native start # or yarn

### For Android:
Start the Metro bundler (if not already running):

    npx react-native start # or yarn

Make sure that Android Studio and an Android Emulator are properly set up.

## Authors

[@NateThurmond](https://github.com/NateThurmond)

## Version History

-   0.2
    -   Update to latest react-native version and updated Readme
    -   See [commit change](https://github.com/NateThurmond/SuperShop/commits/master/) or See [release history](https://github.com/NateThurmond/SuperShop/releases)
-   0.1
    -   Initial Release

## License

This project is licensed under the Apache License, Version 2.0

## Acknowledgments

Inspiration, code snippets, etc.

-   [React Native](https://github.com/facebook/react-native)
-   [Material UI](https://github.com/mui/material-ui)

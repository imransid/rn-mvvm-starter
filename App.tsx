import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { store, persistor } from "./src/app/store";
import AppNavigator from "./src/navigation/AppNavigator";

import SplashScreen from "react-native-splash-screen"

const App: React.FC = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 5000); // Hide after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1AA7A9" />
          </View>
        }
        persistor={persistor}
      >
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

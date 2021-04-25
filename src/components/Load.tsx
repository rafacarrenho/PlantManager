import React from "react";
import { StyleSheet, View } from "react-native";
import loadAnimation from "../assets/load.json";
import LottieView from "lottie-react-native";

const Load = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default Load;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {},
});

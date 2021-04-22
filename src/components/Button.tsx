import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}
export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    height: 56,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  },
});

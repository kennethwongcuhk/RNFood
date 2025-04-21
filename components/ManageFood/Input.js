import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, style, invalid, textInputConfig }) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label]}>{label}</Text>
      <TextInput style={[styles.input]} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary700,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});

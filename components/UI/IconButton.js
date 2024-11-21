import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <FontAwesome name={icon} size={size} color={color} onPress={onPress} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 24,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
    // backgroundColor: "black"
  },
});

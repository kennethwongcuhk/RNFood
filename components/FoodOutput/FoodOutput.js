import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import FoodList from "./FoodList";
import FoodHeader from "./FoodHeader";

export default function FoodOutput({ food, fallbackText }) {
  return (
    <View style={styles.container}>
      <FoodHeader />
      {food.length > 0 ? (
        <FoodList food={food}/>
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 24,
      paddingHorizontal: 24,
      backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
      color: "#ffffff",
      fontSize: 16,
      textAlign: "center",
      marginTop: 32,
    },
});

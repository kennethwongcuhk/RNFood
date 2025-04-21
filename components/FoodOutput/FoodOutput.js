import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import FoodList from "./FoodList";
import FoodHeader from "./FoodHeader";

export default function FoodOutput({ food, fallbackText }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FoodHeader />
        {food.length > 0 ? (
          <FoodList food={food}/>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.infoText}>{fallbackText}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  contentContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
    textAlign: "center",
  },
});

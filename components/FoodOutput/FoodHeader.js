import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { getCalories, toRoundedString } from "../../util/number";
import { GlobalStyles } from "../../constants/styles";

export default function FoodHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.foodColumn}>
        <Text style={styles.headerText}>Food Item</Text>
      </View>
      <View style={styles.nutrientsRow}>
        <Text style={styles.nutrientHeader}>Carbs</Text>
        <Text style={styles.nutrientHeader}>Fat</Text>
        <Text style={styles.nutrientHeader}>Protein</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  foodColumn: {
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  nutrientsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: '60%',
  },
  nutrientHeader: {
    width: 60,
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});
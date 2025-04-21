import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { getCalories, toRoundedString } from "../../util/number";
import { GlobalStyles } from "../../constants/styles";

export default function FoodHeader() {

  return (
    <View style={styles.container}>
      <Text style={styles.period}>Food</Text>
      <View style={styles.nutrients} >

      <Text style={styles.nutrient}>Carbs</Text>
      <Text style={styles.nutrient}>Fat</Text>
      <Text style={styles.nutrient}>Protein</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingRight: 20,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  nutrients: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nutrient: {
    minWidth: 40,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Courier New",
    color: GlobalStyles.colors.primary500,
    marginHorizontal: 5,
  },
});
import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { getCalories, toRoundedString } from "../../util/number";
import { GlobalStyles } from "../../constants/styles";

export default function EntriesSummary({ entries, periodName }) {
  const entriesSum = entries.reduce((sum, entry) => {
    return sum + getCalories(entry)
  }, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{toRoundedString(entriesSum)}</Text>
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
  sum: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Courier New",
    color: GlobalStyles.colors.primary500,
  },
});

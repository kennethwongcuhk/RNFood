import { StyleSheet, Text, View } from "react-native";
import React from "react";

import EntriesSummary from "./EntriesSummary";
import EntriesList from "./EntriesList";
import { GlobalStyles } from "../../constants/styles";

export default function EntriesOutput({
  entries,
  entryPeriod,
  fallbackText,
  showSummary,
  tdee
}) {  
  return (
    <View style={styles.container}>
      {showSummary && (
        <EntriesSummary tdee={tdee} entries={entries} periodName={entryPeriod} />
      )}
      {entries.length > 0 ? (
        <EntriesList entries={entries} />
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

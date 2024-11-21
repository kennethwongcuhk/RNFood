import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import EntriesOutput from "../components/EntriesOutput/EntriesOutput";
import { EntriesContext } from "../store/entries-context";

export default function WeeksEntries() {
  const entriesCtx = useContext(EntriesContext);
  const allEntries = entriesCtx.entries.filter((entry) => true);
  return (
    <View style={styles.container}>
      <EntriesOutput
        entries={allEntries}
        entryPeriod={"TO BE CHANGED"}
        // fallbackText={"No food entry yet"}
        showSummary={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

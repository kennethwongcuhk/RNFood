import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import EntriesOutput from "../components/EntriesOutput/EntriesOutput";
import { EntriesContext } from "../store/entries-context";

export default function AllEntries() {
  const entriesCtx = useContext(EntriesContext);
  const allEntries = entriesCtx.entries.filter((entry) => true);
  return (
    <View style={styles.container}>
      <EntriesOutput
        entries={allEntries}
        entryPeriod={"All time"}
        fallbackText={"No food entry yet"}
        showSummary={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

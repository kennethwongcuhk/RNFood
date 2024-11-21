import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import DateTimePicker from "react-native-ui-datepicker";
import { format, isSameDay } from "date-fns";

import EntriesOutput from "../components/EntriesOutput/EntriesOutput";
import { EntriesContext } from "../store/entries-context";
import { fetchData } from "../util/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";

export default function TodaysEntries() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [chosenDate, setChosenDate] = useState(new Date());

  const entriesCtx = useContext(EntriesContext);
  const navigation = useNavigation();

  const todayEntries = entriesCtx.entries.filter((entry) => {
    return isSameDay(entry.date, chosenDate);
  });

  useEffect(() => {
    async function getEntries() {
      setIsFetching(true);
      try {
        const entries = await fetchData();
        entriesCtx.setEntries(entries);
      } catch (e) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getEntries();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: format(chosenDate, "yyyy-MM-dd"),
    });
  }, [navigation, chosenDate]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="single"
        date={chosenDate}
        onChange={(params) => setChosenDate(params.date)}
      />
      <EntriesOutput
        entries={todayEntries}
        entryPeriod={"Total"}
        fallbackText={"No food entry for " + format(chosenDate, "yyyy-MM-dd")}
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

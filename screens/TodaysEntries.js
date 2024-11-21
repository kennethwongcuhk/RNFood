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
import { GlobalStyles } from "../constants/styles";

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
      <View style={styles.dateContainer}>
        <DateTimePicker
          mode="single"
          date={chosenDate}
          onChange={(params) => setChosenDate(params.date)}
          calendarTextStyle={{ color: GlobalStyles.colors.primary50 }}
          selectedItemColor={GlobalStyles.colors.accent500}
          selectedTextStyle={{ color: GlobalStyles.colors.primary50 }}
          headerTextStyle={{ color: GlobalStyles.colors.primary50 }}
          headerButtonColor={GlobalStyles.colors.primary50}
          weekDaysTextStyle={{ color: GlobalStyles.colors.primary50 }}
          yearContainerStyle={{
            backgroundColor: GlobalStyles.colors.primary700,
            borderWidth: 0,
          }}
          monthContainerStyle={{
            backgroundColor: GlobalStyles.colors.primary700,
            borderWidth: 0,
          }}
        />
      </View>
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
  dateContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});

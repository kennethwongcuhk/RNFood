import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { getFormattedDate } from "../../util/date";
import { getCalories, toRoundedString } from "../../util/number";
import { GlobalStyles } from "../../constants/styles";

export default function EntryItem({
  id,
  description,
  carbohydrates,
  fat,
  protein,
  weight,
  date,
}) {
  const navigation = useNavigation();

  function entryPressHandler() {
    navigation.navigate("ManageEntry", { entryId: id });
  }

  const calories = getCalories({carbohydrates, fat , protein , weight});

  return (
    <Pressable onPress={entryPressHandler}>
      <View style={styles.entryItem}>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textBase, styles.description]}>
            {description.length > 20
              ? description.substr(0, 20) + "..."
              : description}
          </Text>
          <Text style={[styles.textBase]}>{getFormattedDate(date)}</Text>
        </View>
          <View style={styles.numberContainer}>
            <Text style={[styles.textBase, styles.amount]}>
              {toRoundedString(calories)}
            </Text>
          </View>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  entryItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  descriptionContainer: {
    flex: 1,
    marginRight: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  numberContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Courier New",
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { toRoundedString } from "../../util/number";
import { useNavigation } from "@react-navigation/native";

export default function FoodItem({
  id,
  description,
  nutrients: { carbohydrates, fat, protein },
}) {

  const navigation = useNavigation();
  
  
  function entryPressHandler() {
    navigation.navigate("ManageFood", { foodId: id });
  }

  return (
    <Pressable onPress={entryPressHandler}>
      <View style={styles.entryItem}>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textBase, styles.description]}>
            {description.length > 20
              ? description.substr(0, 20) + "..."
              : description}
          </Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            {toRoundedString(carbohydrates)}
          </Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            {toRoundedString(fat)}
          </Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            {toRoundedString(protein)}
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
    backgroundColor: GlobalStyles.colors.primary200,
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
    minWidth: 50,
    marginHorizontal: 5,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Courier New",
  },
});

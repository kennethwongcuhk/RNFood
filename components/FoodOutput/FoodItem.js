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
    <Pressable 
      onPress={entryPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.foodItem}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <View style={styles.nutrientsRow}>
          <View style={styles.nutrientContainer}>
            <Text style={styles.nutrientValue}>
              {toRoundedString(carbohydrates)}
            </Text>
          </View>
          <View style={styles.nutrientContainer}>
            <Text style={styles.nutrientValue}>
              {toRoundedString(fat)}
            </Text>
          </View>
          <View style={styles.nutrientContainer}>
            <Text style={styles.nutrientValue}>
              {toRoundedString(protein)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  foodItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  descriptionContainer: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
    fontWeight: "bold",
  },
  nutrientsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: '60%',
  },
  nutrientContainer: {
    width: 60,
    alignItems: "center",
  },
  nutrientValue: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary800,
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 40,
    textAlign: "center",
  },
});

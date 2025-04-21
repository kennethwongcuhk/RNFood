import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FoodOutput from "../components/FoodOutput/FoodOutput";
import { FoodContext } from "../store/food-context";
import { useNavigation } from "@react-navigation/native";
import { fetchFood } from "../util/http";

export default function AllFood() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const foodCtx = useContext(FoodContext);
  const navigation = useNavigation();

    useEffect(() => {
      async function getFood() {
        setIsFetching(true);
        try {
          const food = await fetchFood();
          foodCtx.setFood(food);
        } catch (e) {
          setError("Could not fetch expenses!");
        }
        setIsFetching(false);
      }
      getFood();
    }, []);

  return (
    <View style={styles.container}>
      <FoodOutput food={foodCtx.food} fallbackText={"No food item yet"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

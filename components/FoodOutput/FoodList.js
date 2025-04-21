import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FoodItem from "./FoodItem";

// import EntryItem from "./EntryItem";

export default function FoodList({ food }) {
  
  return (
    <>
    <FlatList
      data={food}
      renderItem={(itemData) => <FoodItem {...itemData.item} />}
      keyExtractor={(food) => food.id}
    />
    </>
  );
}

const styles = StyleSheet.create({});

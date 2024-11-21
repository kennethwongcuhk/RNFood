import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import EntryItem from "./EntryItem";

export default function EntriesList({ entries }) {
  return (
    <FlatList
      data={entries}
      renderItem={(itemData) => <EntryItem {...itemData.item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({});

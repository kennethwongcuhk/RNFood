import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NumberCard({ label, value }) {
  return (
    <View style={styles.amountContainer}>
      <Text style={[styles.textBase, styles.amount]}>
        {toRoundedString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});

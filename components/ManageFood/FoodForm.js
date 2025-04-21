import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import { toRoundedString } from "../../util/number";
import Button from "../UI/Button";

export default function FoodForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitButtonLabel,
}) {
  const [inputs, setInputs] = useState({
    description: defaultValues ? defaultValues.description.toString() : "",
    carbohydrates: defaultValues
      ? defaultValues.nutrients.carbohydrates.toString()
      : "",
    fat: defaultValues ? defaultValues.nutrients.fat.toString() : "",
    protein: defaultValues ? defaultValues.nutrients.protein.toString() : "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const trimmedDescription = inputs.description.trim();
    const food = {
      description:
        trimmedDescription.length > 0 ? trimmedDescription : "New Food",
      nutrients: {
        carbohydrates: +inputs.carbohydrates,
        fat: +inputs.fat,
        protein: +inputs.protein,
      },
    };

    const descriptionIsValid = true;
    const carbsIsValid = !isNaN(food.nutrients.carbohydrates);
    const fatIsValid = !isNaN(food.nutrients.fat);
    const proteinIsValid = !isNaN(food.nutrients.protein);

    if (
      !descriptionIsValid ||
      !carbsIsValid ||
      !fatIsValid ||
      !proteinIsValid
    ) {
      Alert.alert("Invalid Input", "Please check your input values");
      return;
    }
    onSubmit(food);
  }

  return (
    <View>
      <Input
        label={"Description"}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description,
          placeholder: "New Food",
        }}
      />
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label={"Carbs"}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "carbohydrates"),
            value: inputs.carbohydrates,
            keyboardType: "decimal-pad",
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Fat"}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "fat"),
            value: inputs.fat,
            keyboardType: "decimal-pad",
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Protein"}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "protein"),
            value: inputs.protein,
            keyboardType: "decimal-pad",
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel}>
          {"Cancel"}
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 100,
    marginHorizontal: 8,
  },
});

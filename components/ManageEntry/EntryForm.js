import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import DateTimePicker from "react-native-ui-datepicker";
import { format, isSameDay } from "date-fns";
import { Dropdown } from "react-native-element-dropdown";

import Input from "./Input";
import Button from "../UI/Button";
import { FoodContext } from "../../store/food-context";
import { getFormattedDate } from "../../util/date";
import { precise, toRoundedString } from "../../util/number";
import { GlobalStyles } from "../../constants/styles";

export default function EntryForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitButtonLabel,
}) {
  const foodCtx = useContext(FoodContext);
  const selectableFood = foodCtx.food;
  const [selectedFood, setSelectedFood] = useState(null);
  const [chosenDate, setChosenDate] = useState(new Date());


  const [inputs, setInputs] = useState({
    description: defaultValues ? defaultValues.description.toString() : "",
    carbohydrates: defaultValues ? defaultValues.carbohydrates.toString() : "",
    fat: defaultValues ? defaultValues.fat.toString() : "",
    protein: defaultValues ? defaultValues.protein.toString() : "",
    weight: defaultValues ? defaultValues.weight.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
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
    const entry = {
      description:
        trimmedDescription.length > 0 ? trimmedDescription : "New Food",
      carbohydrates: +inputs.carbohydrates,
      fat: +inputs.fat,
      protein: +inputs.protein,
      weight: inputs.weight.length > 0 ? +inputs.weight : 100,
      date:
        inputs.date.length > 0
          ? new Date(inputs.date)
          : new Date(getFormattedDate(new Date())),
    };

    const descriptionIsValid = true;
    const carbsIsValid = !isNaN(entry.carbohydrates);
    const fatIsValid = !isNaN(entry.fat);
    const proteinIsValid = !isNaN(entry.protein);
    const weightIsValid = !isNaN(entry.weight) && entry.weight > 0;
    const dateIsValid = entry.date.toString() !== "Invalid Date";

    if (
      !descriptionIsValid ||
      !carbsIsValid ||
      !fatIsValid ||
      !proteinIsValid ||
      !weightIsValid ||
      !dateIsValid
    ) {
      Alert.alert("Invalid Input", "Please check your input values");
      return;
    }
    onSubmit(entry);
  }

  const multiply = (inputs.weight ? +inputs.weight : 100) / 100;

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={{
          color: GlobalStyles.colors.primary700,
          fontSize: 18,
        }}
        placeholder="Select item"
        placeholderStyle={{ color: GlobalStyles.colors.primary700 }}
        search
        searchPlaceholder="Search..."
        searchPlaceholderTextColor={GlobalStyles.colors.primary700}
        containerStyle={{
          backgroundColor: GlobalStyles.colors.primary200,
          marginTop: 10,
          borderWidth: 0,
        }}
        inputSearchStyle={{
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomColor: GlobalStyles.colors.primary700,
          backgroundColor: GlobalStyles.colors.primary200,
        }}
        activeColor={GlobalStyles.colors.primary100}
        itemTextStyle={{ color: GlobalStyles.colors.primary700 }}
        data={selectableFood}
        maxHeight={300}
        minHeight={65}
        labelField="description"
        valueField="nutrients"
        value={selectedFood}
        onChange={(item) => {
          setSelectedFood(item);
          setInputs((curInputs) => {
            return {
              ...curInputs,
              description: item.description,
              carbohydrates: item.nutrients.carbohydrates.toString(),
              fat: item.nutrients.fat.toString(),
              protein: item.nutrients.protein.toString(),
            };
          });
        }}
      />
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
            value: toRoundedString(+inputs.carbohydrates * multiply),
            readOnly: true,
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Fat"}
          textInputConfig={{
            value: toRoundedString(+inputs.fat * multiply),
            readOnly: true,
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Protein"}
          textInputConfig={{
            value: toRoundedString(+inputs.protein * multiply),
            readOnly: true,
          }}
        />
      </View>
      <Input
        label={"Weight"}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "weight"),
          value: inputs.weight,
          placeholder: "100",
        }}
      />
      <Input
        label={"Calories"}
        textInputConfig={{
          value: toRoundedString(
            (+inputs.carbohydrates * 4.1 +
              +inputs.fat * 9.5 +
              +inputs.protein * 4.2) *
              multiply
          ),
          readOnly: true,
        }}
      />
      <Input
        label={"Date"}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputs.date,
          placeholder: getFormattedDate(new Date()),
        }}
      />
      <DateTimePicker
        mode="single"
        date={chosenDate}
        onChange={(params) => {
          console.log(format(params.date, "yyyy-MM-dd"));

          inputChangedHandler("date", format(params.date, "yyyy-MM-dd"))
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel} mode="flat">
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
  dropdown: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    height: 40,
    width: "100%",
  },
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

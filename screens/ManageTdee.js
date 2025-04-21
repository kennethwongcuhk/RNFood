import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/UI/Button";
import { updateTdee } from "../util/http";
import { GlobalStyles } from "../constants/styles";
import Input from "../components/ManageTdee/Input";
import { TdeeContext } from "../store/tdee-context";

const activityLevels = [
  { label: "Sedentary (little to no exercise)", value: 1.2 },
  { label: "Lightly Active (1-3 days/week)", value: 1.375 },
  { label: "Moderately Active (3-5 days/week)", value: 1.55 },
  { label: "Very Active (6-7 days/week)", value: 1.725 },
  { label: "Extremely Active", value: 1.9 },
];

const goals = [
  { label: "Cut (lose weight)", value: -300 },
  { label: "Maintain (keep weight)", value: 0 },
  { label: "Bulk (gain weight)", value: 300 },
];

export default function ManageTdee() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState(activityLevels[0].value);
  const [goal, setGoal] = useState(goals[1].value);
  const [tdee, setTDEE] = useState(null);

  const tdeeCtx = useContext(TdeeContext);

  const calculateTDEE = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert cm to m
    const weightInKg = parseFloat(weight);
    const ageInYears = parseFloat(age);
    const goalOffset = parseFloat(goal);

    const bmr =
      66 + 13.7 * weightInKg + 5 * (heightInMeters * 100) - 6.8 * ageInYears;

    const calculatedTDEE = bmr * activityLevel + goalOffset;
    if (isNaN(calculatedTDEE)) {
      Alert.alert("Invalid Input", "Please check your input values");
      return;
    }
    setTDEE(calculatedTDEE);
  };

  async function updateTdeeHandler() {
    tdeeCtx.setTdee(tdee)
    await updateTdee(tdee);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputsRow}>
        <Input
        style={styles.rowInput}
          label={"Height"}
          textInputConfig={{
            onChangeText: setHeight,
            value: { height },
            placeholder: "Height(cm)",
            keyboardType: "numeric",
          }}
        />
        <Input
        style={styles.rowInput}
          label={"Weight"}
          textInputConfig={{
            onChangeText: setWeight,
            value: { weight },
            placeholder: "Weight(kg)",
            keyboardType: "numeric",
          }}
        />
        <Input
        style={styles.rowInput}
          label={"Age"}
          textInputConfig={{
            onChangeText: setAge,
            value: { age },
            placeholder: "Age",
            keyboardType: "numeric",
          }}
        />
      </View>
      <Text style={styles.pickerLabel}>Activity Level (Days per Week):</Text>
      <Picker
        selectedValue={activityLevel}
        style={{
          color: GlobalStyles.colors.primary100,
        }}
        onValueChange={(itemValue) => setActivityLevel(itemValue)}
      >
        {activityLevels.map((level, index) => (
          <Picker.Item
            color={GlobalStyles.colors.primary100}
            key={index}
            label={level.label}
            value={level.value.toString()}
          />
        ))}
      </Picker>
      <Text style={styles.pickerLabel}>Fitness/Workout Goal</Text>
      <Picker
        selectedValue={goal}
        style={{
          color: GlobalStyles.colors.primary100,
        }}
        onValueChange={(itemValue) => setGoal(itemValue)}
      >
        {goals.map((level, index) => (
          <Picker.Item
            color={GlobalStyles.colors.primary100}
            key={index}
            label={level.label}
            value={level.value.toString()}
          />
        ))}
      </Picker>
      <Button onPress={calculateTDEE}>Calculate</Button>
      {tdee !== null && (
        <View style={styles.result}>
          <Text style={styles.resultText}>{tdee.toFixed(0)}</Text>
          <Button onPress={updateTdeeHandler}>Update as my new TDEE</Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  rowInput: {
    flex: 1,
  },
  pickerLabel: {
    color: GlobalStyles.colors.primary100,
  },
  result: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  resultText: {
    fontSize: 50,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
    textAlign: "center",
  },
});

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
    Alert.alert("Success", "Your TDEE has been updated!");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            label={"Height"}
            textInputConfig={{
              onChangeText: setHeight,
              value: { height },
              placeholder: "Height(cm)",
              keyboardType: "numeric",
              placeholderTextColor: "#AAAAAA",
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
              placeholderTextColor: "#AAAAAA",
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
              placeholderTextColor: "#AAAAAA",
            }}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Activity & Goals</Text>
        <Text style={styles.pickerLabel}>Activity Level (Days per Week):</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={activityLevel}
            style={styles.picker}
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
        </View>
        
        <Text style={styles.pickerLabel}>Fitness/Workout Goal:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={goal}
            style={styles.picker}
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
        </View>
        
        <View style={styles.buttonContainer}>
          <Button onPress={calculateTDEE}>Calculate TDEE</Button>
        </View>
      </View>
      
      {tdee !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Your Daily Calories:</Text>
          <Text style={styles.resultText}>{tdee.toFixed(0)}</Text>
          <Text style={styles.unitText}>calories/day</Text>
          <View style={styles.updateButtonContainer}>
            <Button onPress={updateTdeeHandler}>Save as my TDEE</Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  card: {
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.accent500,
    marginBottom: 12,
    marginTop: 8,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
  rowInput: {
    flex: 1,
  },
  pickerLabel: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    color: GlobalStyles.colors.primary100,
  },
  buttonContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  resultCard: {
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  resultLabel: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 48,
    fontWeight: "bold",
    color: GlobalStyles.colors.accent500,
    textAlign: "center",
  },
  unitText: {
    fontSize: 14,
    color: GlobalStyles.colors.primary100,
    marginTop: 4,
    marginBottom: 16,
  },
  updateButtonContainer: {
    width: '80%',
  },
});

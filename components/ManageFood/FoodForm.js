import { Alert, StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import { toRoundedString } from "../../util/number";
import Button from "../UI/Button";
import { addPost } from "../../util/http";

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
    username: "",
  });
  const [shareToComm, setShareToComm] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function toggleShare() {
    setShareToComm((current) => !current);
  }

  async function shareToCommunity(foodData) {
    if (!inputs.username.trim()) {
      Alert.alert("Missing Username", "Please enter your username to share this food item.");
      return;
    }

    setIsSharing(true);
    try {
      const postData = {
        title: `New Food Item: ${foodData.description}`,
        username: inputs.username.trim(),
        content: `I've added a new food item with the following nutrition facts:\n\nCarbs: ${foodData.nutrients.carbohydrates}g\nFat: ${foodData.nutrients.fat}g\nProtein: ${foodData.nutrients.protein}g`,
        date: new Date().toISOString(),
        foodItem: {
          description: foodData.description,
          nutrients: {
            carbohydrates: foodData.nutrients.carbohydrates,
            fat: foodData.nutrients.fat,
            protein: foodData.nutrients.protein
          }
        }
      };
      
      await addPost(postData);
      Alert.alert("Success", "Your food item has been shared to the community!");
    } catch (error) {
      Alert.alert("Error", "Could not share your food item to the community.");
    } finally {
      setIsSharing(false);
    }
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
    
    if (shareToComm) {
      shareToCommunity(food);
    }
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Food Information</Text>
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description,
          placeholder: "New Food",
          placeholderTextColor: "#AAAAAA",
        }}
      />
      
      <Text style={styles.sectionTitle}>Nutrition Facts (g per 100g)</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Carbs"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "carbohydrates"),
            value: inputs.carbohydrates,
            keyboardType: "decimal-pad",
            placeholderTextColor: "#AAAAAA",
          }}
        />
        <Input
          style={styles.rowInput}
          label="Fat"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "fat"),
            value: inputs.fat,
            keyboardType: "decimal-pad",
            placeholderTextColor: "#AAAAAA",
          }}
        />
        <Input
          style={styles.rowInput}
          label="Protein"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "protein"),
            value: inputs.protein,
            keyboardType: "decimal-pad",
            placeholderTextColor: "#AAAAAA",
          }}
        />
      </View>
      
      <View style={styles.shareContainer}>
        <Text style={styles.shareLabel}>Share to Community:</Text>
        <Switch
          value={shareToComm}
          onValueChange={toggleShare}
          trackColor={{ false: "#767577", true: GlobalStyles.colors.primary400 }}
          thumbColor={shareToComm ? GlobalStyles.colors.accent500 : "#f4f3f4"}
        />
      </View>
      
      {shareToComm && (
        <Input
          label="Your Username"
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "username"),
            value: inputs.username,
            placeholder: "Enter your username",
            placeholderTextColor: "#AAAAAA",
          }}
        />
      )}
      
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button 
          style={styles.button} 
          onPress={submitHandler}
          disabled={isSharing}
        >
          {isSharing ? "Sharing..." : submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.accent500,
    marginTop: 8,
    marginBottom: 12,
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
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary400,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary400,
  },
  shareLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

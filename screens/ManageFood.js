import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FoodContext } from "../store/food-context";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import FoodForm from "../components/ManageFood/FoodForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { deleteFood, storeFood, updateFood } from "../util/http";

export default function ManageFood() {
  const route = useRoute();
  const navigation = useNavigation();

  const foodCtx = useContext(FoodContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const editedFoodId = route.params?.foodId;
  const isEditing = !!editedFoodId;

  const selectedFood = foodCtx.food.find((entry) => entry.id === editedFoodId);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Food" : "Add Food",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteFoodHandler() {
    setIsSubmitting(true);
    try {
      foodCtx.deleteFood(editedFoodId);
      await deleteFood(editedFoodId);
    } catch (e) {
      setError("An error occurred.");
      setIsSubmitting(false);
    }
    navigation.goBack();
  }

  async function confirmHandler(foodData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        foodCtx.updateFood(editedFoodId, foodData);
        updateFood(editedFoodId, foodData);
      } else {
        const id = await storeFood(foodData);
        foodCtx.addFood({ ...foodData, id: Math.random().toString() });
      }
    } catch (e) {
      setError("An error occurred.");
      setIsSubmitting(false);
    }
    navigation.goBack();
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FoodForm
          defaultValues={selectedFood}
          onSubmit={confirmHandler}
          onCancel={cancelHandler}
          submitButtonLabel={isEditing ? "Update" : "Add"}
        />
      </View>
      
      {isEditing && (
        <View style={styles.deleteContainer}>
          <Text style={styles.deleteText}>Delete this food item</Text>
          <IconButton
            icon={"trash-o"}
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteFoodHandler}
          />
        </View>
      )}
    </View>
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
  deleteContainer: {
    backgroundColor: GlobalStyles.colors.primary700,
    marginTop: 16,
    padding: 16,
    paddingTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteText: {
    color: GlobalStyles.colors.error500,
    fontSize: 16,
    fontWeight: 'bold',
  }
});

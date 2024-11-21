import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import EntryForm from "../components/ManageEntry/EntryForm";
import { EntriesContext } from "../store/entries-context";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import { deleteEntry, storeData, updateEntry } from "../util/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function ManageEntry() {
  const route = useRoute();
  const navigation = useNavigation();

  const entriesCtx = useContext(EntriesContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const editedEntryId = route.params?.entryId;
  const isEditing = !!editedEntryId;

  const selectedEntry = entriesCtx.entries.find(
    (entry) => entry.id === editedEntryId
  );

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Entry" : "Add Entry",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteEntryHandler() {
    setIsSubmitting(true);
    try {
      entriesCtx.deleteEntry(editedEntryId);
      await deleteEntry(editedEntryId);
      navigation.goBack();
    } catch (e) {
      setError("An error occurred.");
      setIsSubmitting(false);
    }
  }

  async function confirmHandler(entryData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        entriesCtx.updateEntry(editedEntryId, entryData);
        updateEntry(editedEntryId, entryData);
      } else {
        const id = await storeData(entryData);
        entriesCtx.addEntry({ ...entryData, id });
      }
      navigation.goBack();
    } catch (e) {
      setError("An error occurred.");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <EntryForm
        defaultValues={selectedEntry}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash-o"}
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteEntryHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    justifyContent: "center",
    alignItems: "center",
  },
});

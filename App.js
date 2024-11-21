import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./components/UI/IconButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TodaysEntries from "./screens/TodaysEntries";
import AllEntries from "./screens/AllEntries";
import ManageEntry from "./screens/ManageEntry";
import EntriesContextProvider from "./store/entries-context";
import FoodContextProvider from "./store/food-context";
import { GlobalStyles } from "./constants/styles";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          height: 85,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarLabelStyle: { fontSize: 12 },
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon={"plus"}
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageEntry");
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="TodaysEntries"
        component={TodaysEntries}
        options={{
          title: "Today",
          tabBarLabel: "Entries",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6
              name={focused ? "calendar-day" : "calendar"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AllEntries"
        component={AllEntries}
        options={{
          title: "All Entries",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6
              name={focused ? "calendar-days" : "calendar"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageEntry"
        component={ManageEntry}
        options={{
          headerBackTitle: "Back",
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <EntriesContextProvider>
        <FoodContextProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </FoodContextProvider>
      </EntriesContextProvider>
    </>
  );
}

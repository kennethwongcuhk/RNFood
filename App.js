import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./components/UI/IconButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TodaysEntries from "./screens/TodaysEntries";
import AllEntries from "./screens/AllEntries";
import ManageEntry from "./screens/ManageEntry";
import EntriesContextProvider from "./store/entries-context";
import FoodContextProvider from "./store/food-context";
import { GlobalStyles } from "./constants/styles";
import AllFood from "./screens/AllFood";
import ManageFood from "./screens/ManageFood";
import ManageTdee from "./screens/ManageTdee";
import Community from "./screens/Community";
import TdeeContextProvider from "./store/tdee-context";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          height: 85,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="EntryStack"
        component={EntryStack}
        options={{
          tabBarLabel: "Entries",
          headerShown: false,
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
        name="FoodStack"
        component={FoodStack}
        options={{
          tabBarLabel: "Food",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "food-takeout-box" : "food-takeout-box-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ManageTdee"
        component={ManageTdee}
        options={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "#ffffff",
          tabBarLabel: "TDEE",
          title: "TDEE Calculator",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "calculator-variant" : "calculator-variant-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "#ffffff",
          tabBarLabel: "Community",
          title: "Community Feed",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function EntryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="TodaysEntries"
        component={TodaysEntries}
        options={({ navigation }) => ({
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
function FoodStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="AllFood"
        component={AllFood}
        options={({ navigation }) => ({
          title: "Food Items",
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                icon={"plus"}
                size={24}
                color={tintColor}
                onPress={() => {
                  navigation.navigate("ManageFood");
                }}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="ManageFood"
        component={ManageFood}
        options={{
          title: "Manage Food Item",
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
      <TdeeContextProvider>
        
      <EntriesContextProvider>
        <FoodContextProvider>
          <NavigationContainer>
            <MyTabs />
          </NavigationContainer>
        </FoodContextProvider>
      </EntriesContextProvider>
      </TdeeContextProvider>
    </>
  );
}

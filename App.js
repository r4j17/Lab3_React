import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TransactionDetailScreen from "./src/screens/TranscationDetailScreen";
import SummaryScreen from "./src/screens/SummaryScreen";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import TransactionListScreen from "./src/screens/TranscationListScreen";
import AddTransactionScreen from "./src/screens/AddTranscationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TransactionStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: "rgb(102, 176, 228)",
      },
      headerTitleStyle: {
        color: "white",
      },
    }}>
      <Stack.Screen
        name="TransactionList"
        component={TransactionListScreen}
        options={{
          headerTitle: "Transactions List",
        }}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailScreen}
        options={{
          headerTitle: "Transactions Details",
        }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          headerTitle: "Add Transaction",
        }}
      />
    </Stack.Navigator>
  );
}

export default function Route() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "rgb(102, 176, 228)",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            borderTopWidth: 2,
            borderTopColor: "rgb(102, 176, 228)",
            paddingBottom: 10,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen
          name="TransactionScreen"
          component={TransactionStack}
          options={{
            headerTitle: "",
            headerShown: false,
            tabBarLabel: "Transactions",
            tabBarIcon: ({ color, size }) => (
              <Entypo name="text-document" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="AddTransactionScreen"
          component={AddTransactionScreen}
          options={{
            title: "Add Transaction",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: "rgb(102, 176, 228)",
            },
            headerTintColor: "white",
          }}
        />

        <Tab.Screen
          name="SummaryScreen"
          component={SummaryScreen}
          options={{
            title: "Summary",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information-outline" size={size} color={color} />
            ),
            headerStyle: {
              backgroundColor: "rgb(102, 176, 228)",
            },
            headerTintColor: "white",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
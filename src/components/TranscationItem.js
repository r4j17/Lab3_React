import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

export default function TransactionItem({ data }) {
  const navigation = useNavigation();

  const price = parseFloat(data.transactionPrice);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TransactionDetails", data)}
    >
      <View style={styles.container}>
        <Text>{data.transactionName}</Text> 
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }} 
        >
          <Text style={{ color: "rgb(102, 176, 228)" }}>
            ${price.toFixed(2)}
          </Text>
          <Entypo name="chevron-right" size={24} color="rgb(102, 176, 228)" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import TransactionItem from "../components/TranscationItem";

export default function TransactionListScreen({ navigation }) {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchTransactions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transcationList"));
      const transactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactionData(transactions);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  };

  return (
    <View style={{ padding: 8 }}>
      <FlatList
        data={transactionData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem data={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "rgb(102, 176, 228)",
    marginVertical: 8,
  },
});
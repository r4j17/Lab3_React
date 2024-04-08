import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import SummaryLabel from "../components/SummaryLabel";

export default function SummaryScreen() {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "transcationList"));
        const transactions = querySnapshot.docs.map(doc => doc.data());
        setTransactionData(transactions);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
    fetchTransactionData();
    return () => {};
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTransactionData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "transcationList"));
          const transactions = querySnapshot.docs.map(doc => doc.data());
          setTransactionData(transactions);
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      };

      fetchTransactionData();
    }, [])
  );

  const totalNumberOfTransactions = transactionData.length;

  let totalBalance = 0;
  let highestSpending = 0;
  let highestSpendingName = "";
  let lowestSpending = 0;
  let lowestSpendingName = "";

  if (transactionData.length > 0) {
    totalBalance = transactionData.reduce((acc, curr) => acc + Number(curr.transactionPrice), 0);

    highestSpending = Math.max(...transactionData.map(item => Number(item.transactionPrice)));
    const highestSpendingTransaction = transactionData.find(item => Number(item.transactionPrice) === highestSpending);
    highestSpendingName = highestSpendingTransaction ? highestSpendingTransaction.transactionName : "";

    lowestSpending = Math.min(...transactionData.map(item => Number(item.transactionPrice)));
    const lowestSpendingTransaction = transactionData.find(item => Number(item.transactionPrice) === lowestSpending);
    lowestSpendingName = lowestSpendingTransaction ? lowestSpendingTransaction.transactionName : "";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>High Spending</Text>
      <SummaryLabel
        title={highestSpendingName}
        value={`$${highestSpending.toFixed(2)}`}
      />
      <Text style={styles.subHeader}>Low Spending</Text>
      <SummaryLabel
        title={lowestSpendingName}
        value={`$${lowestSpending.toFixed(2)}`}
      />
      <SummaryLabel title="Total Transactions" value={totalNumberOfTransactions} />
      <SummaryLabel title="Balance" value={`$${totalBalance.toFixed(2)}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  subHeader: {
    paddingHorizontal: 8,
    paddingTop: 6,
    fontWeight: "700",
    color: "rgb(102, 176, 228)",
  },
  separator: {
    height: 1,
    backgroundColor: "rgb(102, 176, 228)",
    marginVertical: 8,
  },
});

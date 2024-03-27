import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { transactionData } from "../TranscationData";
import SummaryLabel from "../components/SummaryLabel";

export default function SummaryScreen() {
    const totalNumberOfTransactions = transactionData.length;

    let totalBalance = 0;
    for (let i = 0; i < transactionData.length; i++) {
        totalBalance += transactionData[i].transactionPrice;
    }

    let highestSpending = 0;
    let highestSpendingName = "";
    for (let i = 0; i < transactionData.length; i++) {
        if (transactionData[i].transactionPrice > highestSpending) {
            highestSpending = transactionData[i].transactionPrice;
            highestSpendingName = transactionData[i].transactionName;
        }
    }

    let lowestSpending = transactionData[0].transactionPrice;
    let lowestSpendingName = transactionData[0].transactionName;
    for (let i = 1; i < transactionData.length; i++) {
        if (transactionData[i].transactionPrice < lowestSpending) {
            lowestSpending = transactionData[i].transactionPrice;
            lowestSpendingName = transactionData[i].transactionName;
        }
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
    seperator: {
        height: 1,
        backgroundColor: "rgb(102, 176, 228)",
        marginVertical: 8,
    },
});
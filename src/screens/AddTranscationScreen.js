import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function AddTransactionScreen({ navigation }) {
  const [transactionName, setTransactionName] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionLocation, setTransactionLocation] = useState("");
  const [transactionPrice, setTransactionTotal] = useState("");

  const handleAddTransaction = async () => {
    if (!transactionName || !transactionDate || !transactionLocation || !transactionPrice) {
      console.log("Please fill in all fields");
      return;
    }

    const ref = doc(collection(db, "transcationList"));
    try {
      const submitObject = {
        id: ref.id,
        transactionPrice: Number(transactionPrice),
        transactionName: transactionName,
        transactionLocation: transactionLocation,
        transactionDate: transactionDate,
      };
      await setDoc(ref, submitObject);
      navigation.goBack();

      setTransactionName("");
      setTransactionDate("");
      setTransactionLocation("");
      setTransactionTotal("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, borderRadius: 5, paddingLeft: 15 }}
        placeholder="Name"
        onChangeText={text => setTransactionName(text)}
        value={transactionName}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, borderRadius: 5, paddingLeft: 15 }}
        placeholder="Date"
        onChangeText={text => setTransactionDate(text)}
        value={transactionDate}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, borderRadius: 5, paddingLeft: 15 }}
        placeholder="Location"
        onChangeText={text => setTransactionLocation(text)}
        value={transactionLocation}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, borderRadius: 5, paddingLeft: 15 }}
        placeholder="Total Transaction"
        onChangeText={text => setTransactionTotal(text)}
        value={transactionPrice}
        keyboardType="numeric"
      />
      <Button
        title="Add Transaction"
        onPress={handleAddTransaction}
        color="rgb(102, 176, 228)"
      />

    </View>
  );
}

export default AddTransactionScreen;
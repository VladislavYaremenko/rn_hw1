
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useProductStore } from "../store/productStore";

export default function ProductsScreen() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);

  const handleAddProduct = () => {
    const numericPrice = Number(price);

    if (!title.trim() || !price.trim() || numericPrice <= 0 || !Number.isFinite(numericPrice)) {
      return;
    }

    addProduct({
      id: Date.now(),
      title: title.trim(),
      price: numericPrice,
    });

    setTitle("");
    setPrice("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Додавання продукту</Text>

      <TextInput
        style={styles.input}
        placeholder="Назва продукту"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Ціна"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Усі продукти</Text>

      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text>{product.price} грн</Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeProduct(product.id)}
          >
            <Text style={styles.buttonText}>Видалити</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#D9534F",
    padding: 10,
    borderRadius: 6,
  },
});


import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

import CategoryType from "../types/CategoryType";
import CategoryCard from "../components/CategoryCard";

interface ServerCategory {
  id: string | number;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

const URL = "http://192.168.0.218:3000/categories";

export default function CategoryScreen() {
  const [category, setCategory] = useState<CategoryType>({
    name: "",
    image: "",
    color: "",
  });

  const [categories, setCategories] = useState<ServerCategory[]>([]);

  // Загрузка категорий с сервера
  useEffect(() => {
    fetch(URL, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  // Добавление новой категории
  const handleAddCategory = async () => {
    if (!category.name || !category.image || !category.color) {
      return;
    }

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          name: category.name,
          icon: category.image,
          bgColor: category.color,
          iconColor: "#333333",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const newCategory: ServerCategory = await response.json();

      setCategories((prev) => [...prev, newCategory]);

      setCategory({
        name: "",
        image: "",
        color: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Screen</Text>

      <TextInput
        value={category.name}
        onChangeText={(text) => {
          setCategory({ ...category, name: text });
        }}
        style={styles.input}
        placeholder="name"
      />

      <TextInput
        value={category.image}
        onChangeText={(text) => {
          setCategory({ ...category, image: text });
        }}
        style={styles.input}
        placeholder="image"
      />

      <TextInput
        value={category.color}
        onChangeText={(text) => {
          setCategory({ ...category, color: text });
        }}
        style={styles.input}
        placeholder="color"
      />

      <Button title="ADD" onPress={handleAddCategory} />

      <Text style={{ textAlign: "center" }}>
        {category.name} {category.color} {category.image}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((item) => (
          <CategoryCard
            key={item.id}
            name={item.name}
            icon={item.icon}
            bgColor={item.bgColor}
            iconColor={item.iconColor}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    gap: 20,
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    padding: 8,
  },

  categoryList: {
    paddingHorizontal: 10,
    gap: 10,
  },
});

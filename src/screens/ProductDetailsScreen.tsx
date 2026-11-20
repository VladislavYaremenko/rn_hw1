
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

type DetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;
type DetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const API_BASE_URL = "http://192.168.0.218:3000";

export default function ProductDetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation<DetailsNavigationProp>();

  const { productId } = route.params;

  const [product, setProduct] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log("Product error:", error));
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Завантаження продукту...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text>Назад</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>
        {product.price} {product.unit}
      </Text>

      <View style={styles.rating}>
        <Ionicons name="star" size={18} color="#FFB300" />
        <Text>{product.rating} ({product.reviews} відгуків)</Text>
      </View>

      <Text style={styles.description}>
        Детальна інформація про товар.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 260,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 12,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: "#757575",
    marginTop: 20,
  },
});

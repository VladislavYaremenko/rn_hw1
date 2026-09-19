import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";

const API_BASE_URL = "http://192.168.0.218:3000";

interface Category {
    id: string;
    name: string;
    icon: string;
    bgColor: string;
    iconColor: string;
}

interface Product {
    id: string;
    title: string;
    price: number;
    unit: string;
    rating: number;
    reviews: number;
    image: string;
    categoryId?: string;
}

export default function HomeScreen() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [selectedCategoryId, setSelectedCategoryId] =
        useState<string | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const [categoriesRes, productsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/categories`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                }),

                fetch(`${API_BASE_URL}/products`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                }),
            ]);

            if (!categoriesRes.ok || !productsRes.ok) {
                throw new Error("Не вдалося завантажити дані");
            }

            const categoriesData = await categoriesRes.json();
            const productsData = await productsRes.json();

            setCategories(categoriesData);
            setProducts(productsData);
        } catch (err) {
            console.error(err);
            setError("Помилка підключення до сервера");
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (!selectedCategoryId) {
                return true;
            }

            return (
                String(product.categoryId) ===
                String(selectedCategoryId)
            );
        });
    }, [products, selectedCategoryId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>
                    Завантаження даних...
                </Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.errorText}>
                    {error}
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <Text style={styles.sectionTitle}>
                    Категорії
                </Text>

                <CategoryList
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onSelectCategory={setSelectedCategoryId}
                />

                <Text style={styles.sectionTitle}>
                    Популярні товари
                </Text>

                <ProductList
                    products={filteredProducts}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        paddingHorizontal: 16,
        paddingBottom: 32,
    },

    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        marginTop: 12,
        fontSize: 16,
    },

    errorText: {
        fontSize: 16,
        textAlign: "center",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        marginTop: 16,
    },
});
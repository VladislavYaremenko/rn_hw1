import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
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
    const [sortType, setSortType] = useState<
        "priceAsc" | "priceDesc" | "name"
    >("priceAsc");
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
    const sortedProducts = useMemo(() => {
        const result = [...filteredProducts];

        if (sortType === "priceAsc") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sortType === "priceDesc") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sortType === "name") {
            result.sort((a, b) =>
                a.title.localeCompare(b.title, "uk")
            );
        }

        return result;
    }, [filteredProducts, sortType]);

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

                <View style={styles.sortContainer}>
                    <Text style={styles.sortTitle}>
                        Сортування:
                    </Text>

                    <View style={styles.sortButtons}>
                        <TouchableOpacity
                            style={[
                                styles.sortButton,
                                sortType === "priceAsc" && styles.sortButtonActive,
                            ]}
                            onPress={() => setSortType("priceAsc")}
                        >
                            <Text
                                style={[
                                    styles.sortButtonText,
                                    sortType === "priceAsc" && styles.sortButtonTextActive,
                                ]}
                            >
                                Ціна ↑
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.sortButton,
                                sortType === "priceDesc" && styles.sortButtonActive,
                            ]}
                            onPress={() => setSortType("priceDesc")}
                        >
                            <Text
                                style={[
                                    styles.sortButtonText,
                                    sortType === "priceDesc" && styles.sortButtonTextActive,
                                ]}
                            >
                                Ціна ↓
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.sortButton,
                                sortType === "name" && styles.sortButtonActive,
                            ]}
                            onPress={() => setSortType("name")}
                        >
                            <Text
                                style={[
                                    styles.sortButtonText,
                                    sortType === "name" && styles.sortButtonTextActive,
                                ]}
                            >
                                Назва А-Я
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ProductList
                    products={sortedProducts}
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
    sortContainer: {
        marginBottom: 16,
    },

    sortTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
    },

    sortButtons: {
        flexDirection: "row",
        gap: 8,
    },

    sortButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#FFFFFF",
    },

    sortButtonActive: {
        backgroundColor: "#2E7D32",
        borderColor: "#2E7D32",
    },

    sortButtonText: {
        fontSize: 12,
        color: "#424242",
    },

    sortButtonTextActive: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});
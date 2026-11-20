import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FavoritesScreen from "./FavoritesScreen";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import { Ionicons } from "@expo/vector-icons";
import CartScreen from "./CartScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useCart } from "../context/CartContext";
import type { Product } from "../context/CartContext";
const { width } = Dimensions.get("window");
const isWideScreen = width >= 768;

const API_BASE_URL = "http://192.168.0.218:3000";

interface Category {
    id: string;
    name: string;
    icon: string;
    bgColor: string;
    iconColor: string;
}



export default function HomeScreen() {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<
    "home" | "categories" | "cart" | "profile" | "favorites"
    >("home");
    const { cartItems, addToCart, updateCartQuantity } = useCart();


    const [selectedCategoryId, setSelectedCategoryId] =
        useState<string | null>(null);
    const [sortType, setSortType] = useState<
        "priceAsc" | "priceDesc" | "name"
    >("priceAsc");
    
    const toggleFavorite = (id: string) => {
        setFavoriteIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    
    const addProductToCart = (id: string) => {
    const product = products.find((item) => item.id === id);

    if (product) {
        addToCart(product);
    }
};
    

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
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    flexDirection: isWideScreen ? "row" : "column-reverse",
                    backgroundColor:
                        Platform.OS === "ios" ? "#F5F5F5" : "#EEEEEE",
                },
            ]}
        >
            
            <View
                style={[
                    styles.navigation,
                    isWideScreen
                        ? styles.navigationWide
                        : styles.navigationNarrow,
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeTab === "home" && styles.navItemActive,
                    ]}
                    onPress={() => setActiveTab("home")}
                >
                    <Ionicons name="home-outline" size={22} color="#2E7D32" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeTab === "categories" && styles.navItemActive,
                    ]}
                    onPress={() => setActiveTab("categories")}
                >
                    <Ionicons name="grid-outline" size={22} color="#2E7D32" />
                    <Text style={styles.navText}>Категорії</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeTab === "cart" && styles.navItemActive,
                    ]}
                    onPress={() => navigation.navigate("Cart")}
                >
                    <Ionicons name="cart-outline" size={22} color="#2E7D32" />
                    <Text style={styles.navText}>Кошик</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.navItem,
                        activeTab === "profile" && styles.navItemActive,
                    ]}
                    onPress={() => setActiveTab("profile")}
                >
                    <Ionicons name="person-outline" size={22} color="#2E7D32" />
                    <Text style={styles.navText}>Профіль</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.screenContent}>
                {activeTab === "favorites" ? (
                    <FavoritesScreen
                        products={products}
                        favoriteIds={favoriteIds}
                        onToggleFavorite={toggleFavorite}
                        onGoBack={() => setActiveTab("home")}
                    />
                
                ) : activeTab === "categories" ? (
                    <ScrollView contentContainerStyle={styles.container}>
                        <Text style={styles.sectionTitle}>Категорії</Text>

                        <CategoryList
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            onSelectCategory={(id) => {
                                setSelectedCategoryId(id);
                                setActiveTab("home");
                            }}
                        />
                    </ScrollView>
                ) : activeTab === "profile" ? (
                    <View style={styles.centerContainer}>
                        <Ionicons
                            name="person-circle-outline"
                            size={64}
                            color="#2E7D32"
                        />
                        <Text style={styles.sectionTitle}>Профіль</Text>
                        <Text>Сторінка профілю поки що порожня</Text>
                    </View>
                ) : (
                    <ScrollView
                        contentContainerStyle={styles.container}
                        showsVerticalScrollIndicator={false}
                    >
                        <TouchableOpacity
                            style={styles.favoritesButton}
                            onPress={() => setActiveTab("favorites")}
                        >
                            <Ionicons name="heart" size={20} color="#E53935" />
                            <Text style={styles.favoritesButtonText}>
                                Обране ({favoriteIds.length})
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.favoritesButton}
                            onPress={() => navigation.navigate("Cart")}
                        >
                            <Ionicons name="cart" size={20} color="#2E7D32" />
                            <Text style={styles.favoritesButtonText}>
                                Кошик (
                                {cartItems.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0
                                )}
                                )
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.sectionTitle}>Категорії</Text>

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
                                        sortType === "priceAsc" &&
                                            styles.sortButtonActive,
                                    ]}
                                    onPress={() => setSortType("priceAsc")}
                                >
                                    <Text
                                        style={[
                                            styles.sortButtonText,
                                            sortType === "priceAsc" &&
                                                styles.sortButtonTextActive,
                                        ]}
                                    >
                                        Ціна ↑
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.sortButton,
                                        sortType === "priceDesc" &&
                                            styles.sortButtonActive,
                                    ]}
                                    onPress={() => setSortType("priceDesc")}
                                >
                                    <Text
                                        style={[
                                            styles.sortButtonText,
                                            sortType === "priceDesc" &&
                                                styles.sortButtonTextActive,
                                        ]}
                                    >
                                        Ціна ↓
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.sortButton,
                                        sortType === "name" &&
                                            styles.sortButtonActive,
                                    ]}
                                    onPress={() => setSortType("name")}
                                >
                                    <Text
                                        style={[
                                            styles.sortButtonText,
                                            sortType === "name" &&
                                                styles.sortButtonTextActive,
                                        ]}
                                    >
                                        Назва А-Я
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ProductList
                            products={sortedProducts}
                            favoriteIds={favoriteIds}
                            onToggleFavorite={toggleFavorite}
                            onAddToCart={addProductToCart}
                            onProductPress={(id) =>
                            navigation.navigate("ProductDetails", {
                                productId: id,
                            })
                        }
                        />
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
    flexGrow: 1,
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

    favoritesButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 6,
    padding: 8,
    },

    favoritesButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    },
        navigation: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        gap: 8,
    },

    navigationWide: {
    width: 130,
    minHeight: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
},

    navigationNarrow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
},

    navItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 10,
},

    navItemActive: {
        backgroundColor: "#E8F5E9",
    },

    navText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333333",
    },

    screenContent: {
        flex: 1,
        minWidth: 0,
    },
});
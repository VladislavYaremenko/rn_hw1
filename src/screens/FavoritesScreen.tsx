
import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductList from "../components/ProductList";

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

interface FavoritesScreenProps {
    products: Product[];
    favoriteIds: string[];
    onToggleFavorite: (id: string) => void;
    onGoBack: () => void;
}

export default function FavoritesScreen({
    products,
    favoriteIds,
    onToggleFavorite,
    onGoBack,
}: FavoritesScreenProps) {
    const [isEnabled, setIsEnabled] = useState(false);

    const favoriteProducts = products.filter((product) =>
        favoriteIds.includes(product.id)
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onGoBack}>
                    <Ionicons
                        name="arrow-back"
                        size={26}
                        color="#38834B"
                    />
                </TouchableOpacity>

                <View style={styles.headerTitle}>
                    <Text style={styles.title}>
                        Обране 💕
                    </Text>

                    <Text style={styles.subtitle}>
                        Товари, які ви зберегли
                    </Text>
                </View>

                <Ionicons
                    name="sunny"
                    size={24}
                    color="#F5B82E"
                />

                <Switch
                    value={isEnabled}
                    onValueChange={setIsEnabled}
                />

                <Ionicons
                    name="settings"
                    size={26}
                    color="#777777"
                />
            </View>

            <View style={styles.infoBanner}>
                <View style={styles.heartCircle}>
                    <Ionicons
                        name="heart"
                        size={30}
                        color="#E85D55"
                    />
                </View>

                <View style={styles.infoText}>
                    <Text style={styles.infoTitle}>
                        У вас {favoriteProducts.length} улюблені товари
                    </Text>

                    <Text style={styles.infoSubtitle}>
                        Збережіть ще більше корисних і смачних продуктів!
                    </Text>
                </View>

                <Text style={styles.apple}>🍎</Text>
            </View>

            {/* Список избранных товаров */}
            {favoriteProducts.length > 0 ? (
                <ProductList
                    products={favoriteProducts}
                    favoriteIds={favoriteIds}
                    onToggleFavorite={onToggleFavorite}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons
                        name="heart-outline"
                        size={55}
                        color="#BDBDBD"
                    />

                    <Text style={styles.emptyText}>
                        У вас поки немає улюблених товарів
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 16,
        gap: 6,
    },

    headerTitle: {
        flex: 1,
        marginLeft: 6,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333333",
    },

    subtitle: {
        fontSize: 13,
        fontStyle: "italic",
        color: "#888888",
    },

    infoBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E8F5E9",
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
    },

    heartCircle: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: "#C8E6C9",
        alignItems: "center",
        justifyContent: "center",
    },

    infoText: {
        flex: 1,
        marginHorizontal: 10,
    },

    infoTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#38834B",
    },

    infoSubtitle: {
        fontSize: 11,
        fontStyle: "italic",
        color: "#558B60",
        marginTop: 4,
    },

    apple: {
        fontSize: 38,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },

    emptyText: {
        fontSize: 15,
        color: "#888888",
        marginTop: 12,
        textAlign: "center",
    },
});

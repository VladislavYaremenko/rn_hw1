import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
    title: string;
    price: number;
    unit: string;
    rating: number;
    reviews: number;
    image: string;
}

export default function ProductCard({
    title,
    price,
    unit,
    rating,
    reviews,
    image,
}: ProductCardProps) {
    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={20} color="#BDBDBD" />
            </TouchableOpacity>

            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>

            <Text style={styles.price}>
                {price}{" "}
                <Text style={styles.unit}>
                    {unit}
                </Text>
            </Text>

            <View style={styles.footer}>
                <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="#FFB300" />

                    <Text style={styles.ratingText}>
                        {rating}{" "}
                        <Text style={styles.reviews}>
                            ({reviews})
                        </Text>
                    </Text>
                </View>

                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="cart-outline" size={18} color="#FFFFFF" />

                    <Text style={styles.addButtonText}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%",
        borderRadius: 16,
        padding: 12,
        position: "relative",
        borderWidth: 1,
        borderColor: "#F0F0F0",
        backgroundColor: "#FAFAFA",
    },

    favoriteButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },

    image: {
        width: "100%",
        height: 90,
        marginVertical: 8,
    },

    title: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },

    price: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },

    unit: {
        fontSize: 12,
        fontWeight: "normal",
        color: "#757575",
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 4,
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
    },

    ratingText: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 2,
    },

    reviews: {
        fontSize: 11,
        color: "#9E9E9E",
        fontWeight: "normal",
    },

    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2E7D32",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 12,
    },

    addButtonText: {
        color: "#FFFFFF",
        fontSize: 11,
        marginLeft: 4,
    },
});
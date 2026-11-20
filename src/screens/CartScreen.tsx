import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
const { width } = Dimensions.get("window");
const isWideScreen = width >= 768;

export default function CartScreen() {
    const { cartItems, updateCartQuantity } = useCart();

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [promoCode, setPromoCode] = useState("");

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Кошик</Text>

                <View style={{ width: 25 }} />
            </View>

            <View
                style={[
                styles.mainLayout,
                isWideScreen && styles.mainLayoutWide,
                ]}
            >

            <View style={styles.cartSection}>
                <Text style={styles.sectionTitle}>
                    Ваш Кошик ({cartItems.length})
                </Text>

                {cartItems.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="cart-outline"
                            size={60}
                            color="#BDBDBD"
                        />
                        <Text style={styles.emptyText}>
                            Ваш кошик поки порожній
                        </Text>
                    </View>
                ) : (
                    cartItems.map((item) => (
                        <View key={item.product.id} style={styles.productRow}>
                            <Image
                                source={{ uri: item.product.image }}
                                style={styles.productImage}
                                resizeMode="contain"
                            />

                            <View style={styles.productInfo}>
                                <Text style={styles.productTitle}>
                                    {item.product.title}
                                </Text>

                                <Text style={styles.productPrice}>
                                    {item.product.price} ₴/{item.product.unit}
                                </Text>
                            </View>

                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() =>
                                        updateCartQuantity(item.product.id, -1)
                                    }
                                >
                                    <Text style={styles.quantityButtonText}>−</Text>
                                </TouchableOpacity>

                                <Text style={styles.quantity}>
                                    {item.quantity}
                                </Text>

                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() =>
                                        updateCartQuantity(item.product.id, 1)
                                    }
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </View>

            <View style={styles.summarySection}>
                <Text style={styles.sectionTitle}>Промокод</Text>

                <View style={styles.promoRow}>
                    <TextInput
                        value={promoCode}
                        onChangeText={setPromoCode}
                        placeholder="Промокод"
                        style={styles.promoInput}
                    />

                    <TouchableOpacity
                        style={styles.promoButton}
                        onPress={() =>
                            Alert.alert(
                                "Промокод",
                                "Перевірка промокодів поки не налаштована."
                            )
                        }
                    >
                        <Text style={styles.promoButtonText}>
                            Застосувати
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>
                    Підсумок замовлення
                </Text>

                <View style={styles.summaryRow}>
                    <Text>Сума товарів</Text>
                    <Text>{total.toFixed(2)} ₴</Text>
                </View>

                <View style={styles.summaryRow}>
                    <Text>Доставка</Text>
                    <Text>0 ₴</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Разом</Text>
                    <Text style={styles.totalPrice}>
                        {total.toFixed(2)} ₴
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.checkoutButton,
                        cartItems.length === 0 && styles.disabledButton,
                    ]}
                    disabled={cartItems.length === 0}
                    onPress={() =>
                        Alert.alert(
                            "Замовлення",
                            "Оформлення замовлення поки не реалізовано."
                        )
                    }
                >
                    <Text style={styles.checkoutText}>
                        Оформити замовлення
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    content: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    header: {
        height: 56,
        backgroundColor: "#222630",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    cartSection: {
    padding: 16,
    flex: 1,
    minWidth: 0,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "600",
        marginBottom: 14,
        color: "#252525",
    },
    productRow: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 14,
        padding: 10,
        marginBottom: 12,
        backgroundColor: "#FFFFFF",
    },
    productImage: {
        width: 75,
        height: 70,
    },
    productInfo: {
        flex: 1,
        marginHorizontal: 10,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 13,
        color: "#555555",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: "#E0F2E3",
        alignItems: "center",
        justifyContent: "center",
    },
    quantityButtonText: {
        fontSize: 19,
        color: "#287D48",
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 15,
        minWidth: 16,
        textAlign: "center",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 50,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 15,
        color: "#888888",
    },
    summarySection: {
        backgroundColor: "#E5F3E5",
        padding: 18,
        marginHorizontal: 12,
        borderRadius: 14,
    },
    promoRow: {
        flexDirection: "row",
        gap: 8,
    },
    promoInput: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 42,
    },
    promoButton: {
        backgroundColor: "#25834B",
        paddingHorizontal: 12,
        justifyContent: "center",
        borderRadius: 10,
    },
    promoButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#C8DCC8",
        marginVertical: 16,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 7,
    },
    totalLabel: {
        fontSize: 17,
        fontWeight: "bold",
    },
    totalPrice: {
        fontSize: 19,
        fontWeight: "bold",
    },
    checkoutButton: {
        backgroundColor: "#25834B",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 18,
    },
    disabledButton: {
        backgroundColor: "#A5B8A8",
    },
    checkoutText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15,
    },
    mainLayout: {
    flexDirection: "column",
    flex: 1,
},

mainLayoutWide: {
  flexDirection: "row",
  alignItems: "stretch",
},

summarySectionWide: {
  width: 300,
  alignSelf: "stretch",
  minHeight: "100%",
  marginTop: 16,
  marginRight: 16,
  marginLeft: 0,
  marginBottom: 16,
},
});

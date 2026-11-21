import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useCategoryStore } from "../store/categoryStore";

export default function CategoriesScreen() {
    const navigation = useNavigation();

    const categories = useCategoryStore((state) => state.categories);
    const loading = useCategoryStore((state) => state.loading);
    const error = useCategoryStore((state) => state.error);
    const fetchCategories = useCategoryStore(
        (state) => state.fetchCategories
    );

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() =>
                        navigation.dispatch(DrawerActions.openDrawer())
                    }
                >
                    <Ionicons name="menu" size={28} color="#222" />
                </TouchableOpacity>

                <Text style={styles.title}>Категорії</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : error ? (
                <Text style={styles.message}>{error}</Text>
            ) : (
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.message}>
                            Категорій поки немає
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    menuButton: {
        width: 44,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 8,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        margin: 6,
        backgroundColor: "#FAFAFA",
        borderRadius: 14,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#EEEEEE",
    },
    image: {
        width: "100%",
        height: 130,
    },
    name: {
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
        padding: 12,
    },
    message: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
});

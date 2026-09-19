import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CategoryCardProps {
    name: string;
    icon: string;
    bgColor: string;
    iconColor: string;
    selected?: boolean;
    onPress?: () => void;
}

export default function CategoryCard({
    name,
    icon,
    bgColor,
    iconColor,
    selected = false,
    onPress,
}: CategoryCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: selected ? "#2E7D32" : bgColor,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name={icon as any}
                    size={32}
                    color={selected ? "#FFFFFF" : iconColor}
                />
            </View>

            <Text
                style={[
                    styles.name,
                    {
                        color: selected ? "#2E7D32" : "#212121",
                        fontWeight: selected ? "bold" : "normal",
                    },
                ]}
                numberOfLines={2}
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        marginRight: 16,
        width: 72,
    },

    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    name: {
        fontSize: 11,
        textAlign: "center",
        lineHeight: 14,
    },
});
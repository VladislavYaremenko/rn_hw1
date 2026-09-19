import { ScrollView, StyleSheet } from "react-native";
import CategoryCard from "./CategoryCard";

interface Category {
    id: string;
    name: string;
    icon: string;
    bgColor: string;
    iconColor: string;
}

interface CategoryListProps {
    categories: Category[];
    selectedCategoryId: string | null;
    onSelectCategory: (id: string | null) => void;
}

export default function CategoryList({
    categories,
    selectedCategoryId,
    onSelectCategory,
}: CategoryListProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
        >
            <CategoryCard
                name="Âñ³"
                icon="apps"
                bgColor="#E8F5E9"
                iconColor="#2E7D32"
                selected={selectedCategoryId === null}
                onPress={() => onSelectCategory(null)}
            />

            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    name={category.name}
                    icon={category.icon}
                    bgColor={category.bgColor}
                    iconColor={category.iconColor}
                    selected={selectedCategoryId === category.id}
                    onPress={() => onSelectCategory(category.id)}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    list: {
        paddingBottom: 16,
    },
});
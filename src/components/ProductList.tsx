import { View, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

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

interface ProductListProps {
    products: Product[];
}

export default function ProductList({
    products,
}: ProductListProps) {
    return (
        <View style={styles.grid}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    unit={product.unit}
                    rating={product.rating}
                    reviews={product.reviews}
                    image={product.image}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 16,
    },
});
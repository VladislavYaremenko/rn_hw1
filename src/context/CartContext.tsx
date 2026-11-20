
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

export interface Product {
    id: string;
    title: string;
    price: number;
    unit: string;
    rating: number;
    reviews: number;
    image: string;
    categoryId?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    updateCartQuantity: (id: string, change: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) => item.product.id === product.id
            );

            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateCartQuantity = (id: string, change: number) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.product.id === id
                        ? { ...item, quantity: item.quantity + change }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, updateCartQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}

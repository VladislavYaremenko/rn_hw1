
import { create } from "zustand";

export interface Category {
    id: string;
    name: string;
    icon: string;
    bgColor: string;
    iconColor: string;
    image: string;
}

interface CategoryStore {
    categories: Category[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
}

const API_BASE_URL = "http://192.168.0.218:3000";

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        try {
            set({ loading: true, error: null });

            const response = await fetch(
                `${API_BASE_URL}/categories`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Не вдалося завантажити категорії");
            }

            const data: Category[] = await response.json();

            set({
                categories: data,
                loading: false,
            });
        } catch (error) {
            set({
                error: "Помилка завантаження категорій",
                loading: false,
            });
        }
    },
}));

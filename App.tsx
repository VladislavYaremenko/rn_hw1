
import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { CartProvider } from "./src/context/CartContext";
import HomeScreen from "./src/screens/HomeScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import CartScreen from "./src/screens/CartScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";

import type { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
          >
            <Drawer.Screen
              name="Main"
              component={MainStack}
              options={{ title: "Головна" }}
            />
            <Drawer.Screen
              name="Categories"
              component={CategoriesScreen}
              options={{ title: "Категорії" }}
            />
          </Drawer.Navigator>

          <StatusBar style="auto" />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}

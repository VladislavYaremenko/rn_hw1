import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Inputs } from "./src/ui/Inputs";
import { MyKeyboard } from "./src/ui/MyKeybord";
import CategoryScreen from "./src/screens/CategoryScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CategoryScreen />
        {/* <HomeScreen /> */}
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6f4",
    justifyContent: "center", 
  },
  text: {
    textAlign: "center", 
    fontSize: 20,
    fontWeight: "bold",
  },
  flatListContainer: {
    flexGrow: 0, 
    marginVertical: 20, 
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "black",
  },
  item: {
    marginHorizontal: 10,
  },
});

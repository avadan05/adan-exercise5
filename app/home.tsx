import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Home(){

  const { theme, toggleTheme, isDark } = useTheme();

  return(
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* ✅ TOP RIGHT BUTTON */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          backgroundColor: theme.primary,
          padding: 10,
          borderRadius: 20
        }}
      >
        <Text style={{ color: "#fff", fontSize: 12 }}>
          {isDark ? "Light" : "Dark"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.text, { color: theme.text }]}>
        Welcome to the Homepage 🎉
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:28,
    fontWeight:"bold"
  }
});
import { StyleSheet, Text, View } from "react-native";

export default function Home(){

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Homepage 🎉</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#000"
  },

  text:{
    color:"#ff0000",
    fontSize:28,
    fontWeight:"bold"
  }

});
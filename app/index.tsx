import { useRouter } from "expo-router";
import { useState } from "react"; // ✅ added
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Login(){

const {control, handleSubmit} = useForm();
const router = useRouter();
const { theme, toggleTheme, isDark } = useTheme(); // ✅ updated
const [error, setError] = useState(""); // ✅ added

const onSubmit = (data:any)=>{
  const { email, password } = data;

  if(email === "admin@gmail.com" && password === "1234"){
    setError("");
    router.push("/home");
  } else {
    setError("Invalid email or password");
  }
};

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

<View style={[styles.card, { backgroundColor: theme.card }]}>

<Text style={[styles.title, { color: theme.primary }]}>Log in</Text>

<Controller
control={control}
name="email"
rules={{required:true}}
render={({field:{onChange,value}})=>(
<TextInput
placeholder="Email"
placeholderTextColor="#888"
style={[styles.input, { borderColor: theme.input, color: theme.text }]}
value={value}
onChangeText={onChange}
/>
)}
/>

<Controller
control={control}
name="password"
rules={{required:true}}
render={({field:{onChange,value}})=>(
<TextInput
placeholder="Password"
placeholderTextColor="#888"
secureTextEntry
style={[styles.input, { borderColor: theme.input, color: theme.text }]}
value={value}
onChangeText={onChange}
/>
)}
/>

{/* ✅ ERROR MESSAGE */}
{error ? (
  <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
) : null}

<TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.primary }]} onPress={handleSubmit(onSubmit)}>
<Text style={styles.btnText}>Log in</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>router.push("/register")}>
<Text style={[styles.signup, { color: theme.text }]}>Do you have already an account? <Text style={{ color: theme.primary }}>Sign up</Text></Text>
</TouchableOpacity>

</View>

</View>
);
}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

card:{
width:320,
padding:25,
borderRadius:15
},

title:{
fontSize:32,
fontWeight:"bold",
marginBottom:20
},

input:{
borderWidth:1,
padding:12,
borderRadius:8,
marginBottom:15,
},

loginBtn:{
padding:14,
borderRadius:8,
alignItems:"center"
},

btnText:{
color:"white",
fontSize:18
},

signup:{
marginTop:15,
textAlign:"center",
}

});
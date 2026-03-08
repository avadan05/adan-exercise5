import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login(){

const {control, handleSubmit} = useForm();
const router = useRouter();

const onSubmit = ()=>{
  router.push("/home");
};

return(

<View style={styles.container}>

<View style={styles.card}>

<Text style={styles.title}>Log in</Text>

<Controller
control={control}
name="email"
rules={{required:true}}
render={({field:{onChange,value}})=>(
<TextInput
placeholder="Email"
style={styles.input}
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
secureTextEntry
style={styles.input}
value={value}
onChangeText={onChange}
/>
)}
/>

<TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(onSubmit)}>
<Text style={styles.btnText}>Log in</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>router.push("/register")}>
<Text style={styles.signup}>or, sign up</Text>
</TouchableOpacity>

</View>

</View>
);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#000",
justifyContent:"center",
alignItems:"center"
},

card:{
backgroundColor:"#111",
width:320,
padding:25,
borderRadius:15
},

title:{
fontSize:32,
color:"#ff0000",
fontWeight:"bold",
marginBottom:20
},

input:{
borderWidth:1,
borderColor:"#333",
padding:12,
borderRadius:8,
marginBottom:15,
color:"white"
},

loginBtn:{
backgroundColor:"#ff0000",
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
color:"#aaa"
}

});
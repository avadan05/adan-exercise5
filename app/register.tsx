import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function Register(){

  const router = useRouter();
  const { control, handleSubmit, watch } = useForm();
  const password = watch("password");
  const { theme, toggleTheme, isDark } = useTheme();

  const onSubmit = () => {
    router.push("/setup-account");
  };

  return(

    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* ✅ TOP RIGHT BUTTON */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={styles.toggleBtn}
      >
        <Text style={styles.toggleText}>
          {isDark ? "Light" : "Dark"}
        </Text>
      </TouchableOpacity>

      <View style={[styles.card, { backgroundColor: theme.card }]}>

        <Text style={[styles.title, { color: theme.primary }]}>Sign Up</Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field:{ onChange, value }}) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              style={[styles.input, { borderColor: theme.input, color: theme.text }]}
              value={value || ""}   // ✅ FIX
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field:{ onChange, value }}) => (
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={[styles.input, { borderColor: theme.input, color: theme.text }]}
              value={value || ""}   // ✅ FIX
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            validate:(value)=> value === password || "Passwords do not match"
          }}
          render={({ field:{ onChange, value }}) => (
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={[styles.input, { borderColor: theme.input, color: theme.text }]}
              value={value || ""}   // ✅ FIX
              onChangeText={onChange}
            />
          )}
        />

        <TouchableOpacity 
          style={[styles.loginBtn, { backgroundColor: theme.primary }]} 
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>router.replace("/")}>
          <Text style={[styles.signup, { color: theme.text }]}>
            Already have an account? Log in
          </Text>
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
  },

  // ✅ CLEAN button styles
  toggleBtn:{
    position:"absolute",
    top:50,
    right:20,
    padding:10,
    borderRadius:20,
    backgroundColor:"#888"
  },

  toggleText:{
    color:"#fff",
    fontSize:12
  }

});
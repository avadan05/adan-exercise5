import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function SetupAccount() {

  const { control, handleSubmit } = useForm<FormData>();
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const { theme, toggleTheme, isDark } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ FIX
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  const onSubmit = (data: FormData) => {
    router.push("/home");
  };

  return (

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

      <Text style={[styles.title, { color: theme.primary }]}>
        Setup Profile
      </Text>

      <TouchableOpacity 
        style={[styles.photoBtn, { backgroundColor: theme.primary }]} 
        onPress={pickImage}
      >
        <Text style={{ color: "white" }}>Upload Profile Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Controller
        control={control}
        name="firstName"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#aaa"
            style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
            value={value || ""} // ✅ FIX
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#aaa"
            style={[styles.input, { borderColor: theme.primary, color: theme.text }]}
            value={value || ""} // ✅ FIX
            onChangeText={onChange}
          />
        )}
      />

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: theme.primary }]} 
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.btnText}>Finish Setup</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  photoBtn: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 15
  },

  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  btn: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },

  // ✅ toggle styles
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
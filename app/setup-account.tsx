import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type FormData = {
  firstName: string;
  lastName: string;
};

export default function SetupAccount() {

  const { control, handleSubmit } = useForm<FormData>();
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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

    <View style={styles.container}>

      <Text style={styles.title}>Setup Profile</Text>

      <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
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
            style={styles.input}
            value={value}
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
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>Finish Setup</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 25
  },

  title: {
    color: "#ff0000",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },

  photoBtn: {
    backgroundColor: "#ff0000",
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
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#ff0000",
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  btn: {
    backgroundColor: "#ff0000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }

});
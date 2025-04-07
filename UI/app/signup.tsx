// app/signup.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (email && password) {
      // TODO: Signup logic here
      router.replace('/'); // Go to Home after signup
    }
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require('../assets/images/Background-Image.jpeg')} // 👈 Put your image here
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sign up</Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Entypo name="lock" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

     

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginLink}>
          Already have an account? <Text style={styles.linkText}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  image: { width: '100%', height: 180 },
  title: { fontSize: 26, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { flex: 1, paddingVertical: 10, marginLeft: 10 },
  
  signupButton: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupText: { color: 'white', fontWeight: 'bold' },
  
 
  loginLink: { textAlign: 'center', color: '#888',marginTop:18 },
  linkText: { color: '#32CD32', fontWeight: 'bold' },
});

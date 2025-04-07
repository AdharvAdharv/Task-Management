// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      router.replace('/homepage');
    }
  };

  return (
    <View style={styles.container}>
      {/* Image illustration */}
      <Image
        source={require('../assets/images/Background-Image.jpeg')} // Replace with your image
        style={styles.image}
        resizeMode="contain"
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Hello,</Text>
      <Text style={styles.subtitle}>Welcome back again</Text>

      {/* Username */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={email}
          onChangeText={setEmail}
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

     

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signinButton} onPress={handleLogin}>
        <Text style={styles.signinText}>Sign in</Text>
      </TouchableOpacity>

      

     

      {/* Signup link */}
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.signupLink}>
          Don’t have an account? <Text style={styles.linkText}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  image: { width: '100%', height: 180 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 10 },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7e9',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { flex: 1, paddingVertical: 10, marginLeft: 10 },
 
  signinButton: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signinText: { color: 'white', fontWeight: 'bold' },
  or: { textAlign: 'center', marginVertical: 20, color: '#555' },
 
  signupLink: { textAlign: 'center', color: '#888',marginTop:18 },
  linkText: { color: '#32CD32', fontWeight: 'bold' },
});

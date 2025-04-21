import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddTask() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleAddTask = async () => {
    if (!task.trim()) {
      Alert.alert("Validation", "Please enter a task.");
      return;
    }


    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token used:", token);

      const res = await fetch("http://192.168.26.231:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         
        },
        body: JSON.stringify({ title: task ,description }),
        
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Task added successfully!");
        setTask("");
        setDescription("");
        router.back(); 
      } else {
        Alert.alert("Error", data.message || "Failed to add task.");
      }
    } catch (err) {
      console.error("Add Task Error:", err);
      Alert.alert("Error", "Something went wrong while adding the task.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter a new task:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your task..."
        value={task}
        onChangeText={setTask}
      />

<Text style={styles.label}>Task Description:</Text>
<TextInput
  style={styles.input}
  placeholder="Type task description..."
  value={description}
  onChangeText={setDescription}
/>


      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  label: { fontSize: 20, fontWeight: "600", marginBottom: 12, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});

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

export default function AddTask() {
  const [task, setTask] = useState("");
  const router = useRouter();

  const handleAddTask = async () => {
    if (!task.trim()) {
      Alert.alert("Validation", "Please enter a task.");
      return;
    }


    try {
      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify({ title: task }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Task added successfully!");
        setTask("");
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

import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditTask() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://192.168.26.231:3000/tasks/${id}`);
        const data = await res.json();
        setTask({ title: data.title, description: data.description || "" });
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://192.168.26.231:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (res.ok) {
        Alert.alert("Success", "Task updated successfully");
        router.back(); // Go back to homepage
      } else {
        Alert.alert("Error", "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        multiline
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
      />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

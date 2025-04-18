import React, { useEffect, useState } from "react";
import {View,Text,  FlatList,StyleSheet,ImageBackground,TouchableOpacity, Image,} from "react-native";
import { useRouter } from "expo-router";

export default function Homepage() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/tasks", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log("Fetched data :",data);
        
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const renderItem = ({  }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskText}>hello</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/images/Background-Image.png")}
      style={styles.background}
      resizeMode="cover"
    >

<View style={styles.profileContainer}>
  <Image
    source={require("../assets/images/Background-Image.jpeg")}
    style={styles.avatar}
  />    
  <View>
    <Text style={styles.name}>Batman</Text>
    <Text style={styles.email}>batman@wayne.com</Text>
  </View>
</View>


      <View style={styles.overlay}>
        <Text style={styles.heading}>My Tasks</Text>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add-task")}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.9)", 
      padding: 20,
      paddingTop: 60,
    },
    heading: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 20,
    },
    taskCard: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    taskText: {
      fontSize: 18,
      color: "#333",
    },
    addButton: {
      position: "absolute",
      bottom: 30,
      right: 30,
      backgroundColor: "#32CD32",
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 30,
      elevation: 5,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#ffffffcc",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
      },
      avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,
      },
      name: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#333",
      },
      email: {
        fontSize: 12,
        color: "#555",
      },
    
  });
  

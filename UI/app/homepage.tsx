import React, { useEffect, useState } from "react";
import {View,Text,  FlatList,StyleSheet,ImageBackground,TouchableOpacity, Image,} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";

export default function Homepage() {
  const [tasks, setTasks] = useState([]);
  const [profile, setProfile] = useState(null);

  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://192.168.26.231:3000/tasks", {
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
  }, [])
);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://192.168.26.231:3000/users/profile", {
        method: "GET",
        credentials: "include", 
      });
      const data = await res.json();
      console.log("Profile Data:", data);
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  fetchProfile();
}, []);


  const renderItem = ({item}) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskText}>{item.title}</Text>
      {item.description ? (
        <Text style={{ color: "#777", marginTop: 5 }}>{item.description}</Text>
      ) : null}

<View style={styles.buttonRow}>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push({ pathname: "/edit-task", params: { id: item._id } })}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
  onPress={() => toggleStatus(item._id, item.completed)}
  style={[
    styles.statusButton,
    { backgroundColor: item.completed ? "#32CD32" : "#FFA500" },
  ]}
>
  <Text style={styles.statusText}>
    {item.completed ? "✔ Completed" : "⏳ Pending"}
  </Text>
</TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item._id)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>

    </View>
  );

  

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`http://192.168.26.231:3000/tasks/${taskId}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://192.168.26.231:3000/users/logout", {
        method: "POST",
        credentials: "include",
      });
  
      const data = await res.json();
      console.log(data.message);
  
      // Navigate to login screen
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const toggleStatus = async (id, currentCompleted) => {
    const newCompleted = !currentCompleted;
  
    try {
      const res = await fetch(`http://192.168.26.231:3000/tasks/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ completed: newCompleted }),
      });
  
      const updated = await res.json();
      console.log("Status updated:", updated);
  
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: newCompleted } : task
        )
      );
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };
  
  
  
  

  return (
    <ImageBackground
      source={require("../assets/images/Wallpaper.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >

<View style={styles.profileContainer}>
  <Image
    source={require("../assets/images/avatar-profile-picture-icon.jpg")}
    style={styles.avatar}
  />
  <View>
    <Text style={styles.name}>{profile?.name || "Loading..."}</Text>
    <Text style={styles.email}>{profile?.email || ""}</Text>
  </View>
<TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>
</View>



    

      <View style={styles.overlay}>
        <Text style={styles.heading}>My Tasks</Text>

        <FlatList
          data={tasks}  
          keyExtractor={(item) => item._id.toString()}
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

      buttonRow: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
      },
      editButton: {
        backgroundColor: "#1E90FF",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 10,
      },
      deleteButton: {
        backgroundColor: "#FF6347",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
      },
      logoutButton: {
        backgroundColor: "#ff4d4d",
        padding: 8,
        borderRadius: 8,
        marginTop: 10,
        marginLeft: 12,
        alignSelf: "flex-end",
      },
      logoutText: {
        color: "#fff",
        fontWeight: "bold",
      },

      statusButton: {
        marginTop: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignSelf: "flex-start",
        
      },
      
      statusText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
      },
      
      
      
    
  });
  

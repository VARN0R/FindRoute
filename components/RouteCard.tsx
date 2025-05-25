import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Route } from "../types/types";

interface RouteCardProps {
  route: Route;
  onPress: (route: Route) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(route)}
      activeOpacity={0.8}
    >
      <Image source={route.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {route.title}
        </Text>
        <View style={styles.authorContainer}>
          <Image source={route.author.avatar} style={styles.avatar} />
          <Text style={styles.authorName} numberOfLines={1}>
            {route.author.name}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{route.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Rubik-SemiBold",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik-Regular",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik-Medium",
  },
});

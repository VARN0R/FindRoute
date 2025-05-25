import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TouristPlace } from "../types/types";

interface PlaceCardProps {
  place: TouristPlace;
  onPress: (place: TouristPlace) => void;
  onRemove: (place: TouristPlace) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onPress,
  onRemove,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(place)}
      activeOpacity={0.7}
    >
      <Image
        source={
          typeof place.images[0] === "string"
            ? { uri: place.images[0] }
            : typeof place.images[0] === "number"
            ? place.images[0]
            : place.images[0]
        }
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{place.name}</Text>
          <TouchableOpacity
            onPress={() => onRemove(place)}
            style={styles.removeButton}
          >
            <Ionicons name="heart" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
        {place.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{place.rating.toFixed(1)}</Text>
          </View>
        )}
        <Text style={styles.address} numberOfLines={1}>
          {place.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
    marginTop: 16,
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: "#666",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
});

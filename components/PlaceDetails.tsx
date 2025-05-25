import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TouristPlace } from "../types/types";

interface PlaceDetailsProps {
  place: TouristPlace;
  onClose: () => void;
  onSave?: (place: TouristPlace) => void;
  isSaved?: boolean;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({
  place,
  onClose,
  onSave,
  isSaved = false,
}) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close-circle" size={32} color="#666" />
      </TouchableOpacity>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
      >
        {place.images.map((image, index) => (
          <Image
            key={index}
            source={
              typeof image === "string"
                ? { uri: image }
                : typeof image === "number"
                ? image
                : image
            }
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{place.name}</Text>
          {onSave && (
            <TouchableOpacity
              onPress={() => onSave(place)}
              style={styles.saveButton}
            >
              <Ionicons
                name={isSaved ? "heart" : "heart-outline"}
                size={24}
                color={isSaved ? "#FF3B30" : "#666"}
              />
            </TouchableOpacity>
          )}
        </View>

        {place.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{place.rating.toFixed(1)}</Text>
          </View>
        )}

        <Text style={styles.description}>{place.description}</Text>

        <View style={styles.infoSection}>
          <Ionicons name="location" size={24} color="#666" />
          <Text style={styles.infoText}>{place.address}</Text>
        </View>

        {place.openingHours && (
          <View style={styles.infoSection}>
            <Ionicons name="time" size={24} color="#666" />
            <Text style={styles.infoText}>{place.openingHours}</Text>
          </View>
        )}

        {place.contactInfo && (
          <View style={styles.contactSection}>
            {place.contactInfo.phone && (
              <View style={styles.infoSection}>
                <Ionicons name="call" size={24} color="#666" />
                <Text style={styles.infoText}>{place.contactInfo.phone}</Text>
              </View>
            )}
            {place.contactInfo.website && (
              <View style={styles.infoSection}>
                <Ionicons name="globe" size={24} color="#666" />
                <Text style={styles.infoText}>{place.contactInfo.website}</Text>
              </View>
            )}
            {place.contactInfo.email && (
              <View style={styles.infoSection}>
                <Ionicons name="mail" size={24} color="#666" />
                <Text style={styles.infoText}>{place.contactInfo.email}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    padding: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    color: "#666",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
  contactSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

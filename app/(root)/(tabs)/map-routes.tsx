import { mockPlaces } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Map } from "../../../components/Map";
import { PlaceDetails } from "../../../components/PlaceDetails";
import { TouristPlace } from "../../../types/types";

const MapRoutes = () => {
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace | null>(null);
  const { addToFavorites, removeFromFavorites, isPlaceFavorite, clearRoute } =
    useGlobalContext();
  const router = useRouter();

  const handleCloseDetails = () => {
    setSelectedPlace(null);
  };

  const handleSavePlace = (place: TouristPlace) => {
    if (isPlaceFavorite(place)) {
      removeFromFavorites(place);
    } else {
      addToFavorites(place);
    }
  };

  const handleCreateRoute = () => {
    clearRoute();
    router.push("/route");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Map
          places={mockPlaces}
          onPlacePress={setSelectedPlace}
          onCreateRoute={handleCreateRoute}
        />
        {selectedPlace && (
          <View style={styles.detailsContainer}>
            <PlaceDetails
              place={selectedPlace}
              onClose={handleCloseDetails}
              onSave={handleSavePlace}
              isSaved={isPlaceFavorite(selectedPlace)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapRoutes;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

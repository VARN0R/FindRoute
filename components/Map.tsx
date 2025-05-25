import { useGlobalContext } from "@/lib/global-provider";
import { LocationData } from "@/lib/location";
import { Ionicons } from "@expo/vector-icons";
import Mapbox from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TouristPlace } from "../types/types";

interface MapProps {
  places: TouristPlace[];
  onPlacePress?: (place: TouristPlace) => void;
  showRoute?: boolean;
  onCreateRoute?: () => void;
  userLocation?: LocationData | null;
  isTrackingLocation?: boolean;
  onLocationPress?: () => void;
}

// Координаты центра Беларуси
const BELARUS_CENTER = {
  latitude: 53.9045,
  longitude: 27.5615,
};

export const Map: React.FC<MapProps> = ({
  places,
  onPlacePress,
  showRoute = false,
  onCreateRoute,
  userLocation,
  isTrackingLocation = false,
  onLocationPress,
}) => {
  const { selectedRoute, addToRoute, removeFromRoute } = useGlobalContext();
  const [routeCoordinates, setRouteCoordinates] = useState<number[][]>([]);

  useEffect(() => {
    console.log("Map props updated:", { userLocation, isTrackingLocation });
  }, [userLocation, isTrackingLocation]);

  useEffect(() => {
    // Ensure Mapbox is properly initialized
    Mapbox.setTelemetryEnabled(false);
  }, []);

  useEffect(() => {
    const calculateRoute = async () => {
      if (selectedRoute.length < 2) {
        console.log("Not enough points for route:", selectedRoute.length);
        setRouteCoordinates([]);
        return;
      }

      try {
        // Создаем строку с координатами для API
        const coordinates = selectedRoute
          .map(
            (place) =>
              `${place.coordinates.longitude},${place.coordinates.latitude}`
          )
          .join(";");

        console.log("Calculating route for coordinates:", coordinates);

        // Получаем маршрут через Directions API
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
        console.log("Request URL:", url);

        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", JSON.stringify(data, null, 2));

        if (data.routes && data.routes[0]) {
          // Получаем координаты маршрута из ответа API
          const routeCoords = data.routes[0].geometry.coordinates;
          console.log("Route coordinates:", routeCoords);
          setRouteCoordinates(routeCoords);
        } else {
          console.error("No routes found in response:", data);
          setRouteCoordinates([]);
        }
      } catch (error) {
        console.error("Error calculating route:", error);
        if (error instanceof Error) {
          console.error("Error details:", error.message);
        }
        setRouteCoordinates([]);
      }
    };

    calculateRoute();
  }, [selectedRoute]);

  if (!places || places.length === 0) {
    return null;
  }

  const handlePlacePress = (place: TouristPlace) => {
    console.log("Place pressed:", place.name);
    console.log("Current selectedRoute:", selectedRoute);

    if (showRoute) {
      const isSelected = selectedRoute.some((p) => p.id === place.id);
      console.log("Is place selected:", isSelected);

      if (isSelected) {
        console.log("Removing place from route:", place.name);
        removeFromRoute(place);
      } else {
        console.log("Adding place to route:", place.name);
        addToRoute(place);
      }
    } else {
      onPlacePress?.(place);
    }
  };

  const isPlaceSelected = (place: TouristPlace) => {
    return showRoute && selectedRoute.some((p) => p.id === place.id);
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.Street}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <Mapbox.Camera
          zoomLevel={userLocation ? 15 : 6}
          centerCoordinate={
            userLocation
              ? [userLocation.longitude, userLocation.latitude]
              : [BELARUS_CENTER.longitude, BELARUS_CENTER.latitude]
          }
          animationMode="flyTo"
          animationDuration={2000}
        />

        {userLocation && (
          <Mapbox.ShapeSource
            id="userLocation"
            shape={{
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [userLocation.longitude, userLocation.latitude],
              },
              properties: {},
            }}
          >
            <Mapbox.CircleLayer
              id="userLocationAccuracy"
              style={{
                circleRadius: 20,
                circleColor: "rgba(0, 122, 255, 0.2)",
                circleStrokeWidth: 2,
                circleStrokeColor: "#007AFF",
              }}
            />
            <Mapbox.CircleLayer
              id="userLocationDot"
              style={{
                circleRadius: 6,
                circleColor: "#007AFF",
              }}
            />
          </Mapbox.ShapeSource>
        )}

        {showRoute && routeCoordinates.length > 0 && (
          <Mapbox.ShapeSource
            id="route"
            shape={{
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates,
              },
            }}
          >
            <Mapbox.LineLayer
              id="routeLine"
              style={{
                lineColor: "#007AFF",
                lineWidth: 4,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </Mapbox.ShapeSource>
        )}

        {places.map((place) => {
          const selected = isPlaceSelected(place);
          return (
            <Mapbox.PointAnnotation
              key={place.id}
              id={place.id}
              coordinate={[
                place.coordinates.longitude,
                place.coordinates.latitude,
              ]}
              onSelected={() => handlePlacePress(place)}
              selected={selected}
              anchor={{ x: 0.5, y: 1 }}
            >
              <Ionicons
                name="location"
                size={32}
                color={selected ? "#FF3B30" : "#007AFF"}
              />
            </Mapbox.PointAnnotation>
          );
        })}
      </Mapbox.MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.locationButton,
            isTrackingLocation && styles.activeButton,
          ]}
          onPress={() => {
            console.log("Location button pressed in Map component");
            onLocationPress?.();
          }}
        >
          <Ionicons
            name={isTrackingLocation ? "location" : "location-outline"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {!showRoute && (
          <TouchableOpacity style={styles.routeButton} onPress={onCreateRoute}>
            <Ionicons name="map" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    gap: 12,
  },
  locationButton: {
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: "#FF3B30",
  },
  routeButton: {
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userLocationMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 122, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  userLocationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
});

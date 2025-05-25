import { mockPlaces } from "@/constants/data";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import {
  getCurrentLocation,
  LocationData,
  watchLocation,
} from "@/lib/location";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Map } from "../../../components/Map";

const RouteScreen = () => {
  const { selectedRoute } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (isTrackingLocation) {
      unsubscribe = watchLocation((location) => {
        setUserLocation(location);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isTrackingLocation]);

  const handleLocationPress = async () => {
    if (isTrackingLocation) {
      setIsTrackingLocation(false);
      setUserLocation(null);
    } else {
      const location = await getCurrentLocation();
      if (location) {
        setUserLocation(location);
        setIsTrackingLocation(true);
      }
    }
  };

  if (!selectedRoute || selectedRoute.length < 2) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View
            className="flex flex-row items-center justify-between pb-5 px-7"
            style={{ marginTop: insets.top }}
          >
            <Text className="text-xl font-rubik-bold">Ваш маршрут</Text>
            <Image source={icons.bell} className="size-5" />
          </View>

          <Text className="pb-5 px-7" style={styles.noRouteText}>
            Выберите места для создания маршрута{"\n"}
            (минимум 2 места)
          </Text>

          <Map
            places={mockPlaces}
            showRoute={true}
            userLocation={userLocation}
            isTrackingLocation={isTrackingLocation}
            onLocationPress={handleLocationPress}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Map
          places={mockPlaces}
          showRoute={true}
          userLocation={userLocation}
          isTrackingLocation={isTrackingLocation}
          onLocationPress={handleLocationPress}
        />
        <View style={styles.routeInfoContainer}>
          <Text style={styles.routeInfoTitle}>Информация о маршруте</Text>
          <Text style={styles.routeInfoText}>
            {selectedRoute
              .map((place, index) => `${index + 1}. ${place.name}\n`)
              .join("")}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RouteScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  textContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  noRouteText: {
    fontSize: 14,
    color: "#666",
  },
  routeInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
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
  routeInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  routeInfoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

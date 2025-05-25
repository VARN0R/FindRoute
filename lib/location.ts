import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

// Initialize Geolocation for Android
if (Platform.OS === "android") {
  Geolocation.requestAuthorization("whenInUse");
}

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
}

export async function requestLocationPermission(): Promise<boolean> {
  try {
    if (Platform.OS === "ios") {
      console.log("Requesting iOS location permission...");
      const auth = await Geolocation.requestAuthorization("whenInUse");
      console.log("iOS location permission result:", auth);
      return auth === "granted";
    }

    if (Platform.OS === "android") {
      console.log("Requesting Android location permission...");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Разрешение на использование геолокации",
          message: "Приложению необходим доступ к вашей геолокации",
          buttonNeutral: "Спросить позже",
          buttonNegative: "Отмена",
          buttonPositive: "OK",
        }
      );
      console.log("Android location permission result:", granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return false;
  } catch (error) {
    console.error("Error requesting location permission:", error);
    return false;
  }
}

async function isLocationEnabled(): Promise<boolean> {
  try {
    if (Platform.OS === "android") {
      return new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          () => {
            resolve(true);
          },
          (error) => {
            console.log("Location services check error:", error);
            if (error.code === 2) {
              // Position unavailable
              resolve(false);
            } else {
              resolve(true);
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 1000,
            maximumAge: 0,
          }
        );
      });
    }
    return true; // For iOS, we'll rely on the permission check
  } catch (error) {
    console.error("Error checking location services:", error);
    return false;
  }
}

export async function getCurrentLocation(): Promise<LocationData | null> {
  try {
    console.log("Getting current location...");
    const hasPermission = await requestLocationPermission();
    const isEnabled = await isLocationEnabled();

    if (!hasPermission) {
      console.log("Location permission denied");
      return null;
    }

    if (!isEnabled) {
      console.log(
        "Location services are disabled. Please enable location services in your device settings."
      );
      return null;
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        console.log("Location request timed out");
        reject(new Error("Location request timed out"));
      }, 30000);

      Geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          console.log("Current position received:", position);
          if (!position || !position.coords) {
            console.error("Invalid position data received");
            reject(new Error("Invalid position data"));
            return;
          }
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy ?? null,
          });
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error("Error getting current position:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        }
      );
    });
  } catch (error) {
    console.error("Error in getCurrentLocation:", error);
    return null;
  }
}

export function watchLocation(
  callback: (location: LocationData) => void
): () => void {
  let watchId: number | null = null;

  const startWatching = async () => {
    try {
      console.log("Starting location watch...");
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        console.log("Location permission denied for watch");
        return () => {};
      }

      watchId = Geolocation.watchPosition(
        (position) => {
          console.log("Watch position update:", position);
          if (!position || !position.coords) {
            console.error("Invalid position data received in watch");
            return;
          }
          callback({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy ?? null,
          });
        },
        (error) => {
          console.error("Error watching position:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
        },
        {
          enableHighAccuracy: false,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
          forceRequestLocation: true,
        }
      );
      console.log("Watch started with ID:", watchId);
    } catch (error) {
      console.error("Error starting location watch:", error);
    }
  };

  startWatching();

  return () => {
    if (watchId !== null) {
      console.log("Clearing watch with ID:", watchId);
      Geolocation.clearWatch(watchId);
    }
  };
}

import { createContext, useContext, useState } from "react";
import { TouristPlace } from "../types/types";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: () => Promise<void>;
  favorites: TouristPlace[];
  addToFavorites: (place: TouristPlace) => void;
  removeFromFavorites: (place: TouristPlace) => void;
  isPlaceFavorite: (place: TouristPlace) => boolean;
  selectedRoute: TouristPlace[];
  addToRoute: (place: TouristPlace) => void;
  removeFromRoute: (place: TouristPlace) => void;
  clearRoute: () => void;
}

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  user: null,
  loading: false,
  refetch: async () => {},
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isPlaceFavorite: () => false,
  selectedRoute: [],
  addToRoute: () => {},
  removeFromRoute: () => {},
  clearRoute: () => {},
});

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { data: user, loading, refetch } = useAppwrite({ fn: getCurrentUser });
  const [favorites, setFavorites] = useState<TouristPlace[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<TouristPlace[]>([]);

  const isLoggedIn = !!user;

  const addToFavorites = (place: TouristPlace) => {
    setFavorites((prev) => [...prev, place]);
  };

  const removeFromFavorites = (place: TouristPlace) => {
    setFavorites((prev) => prev.filter((p) => p.id !== place.id));
  };

  const isPlaceFavorite = (place: TouristPlace) => {
    return favorites.some((p) => p.id === place.id);
  };

  const addToRoute = (place: TouristPlace) => {
    setSelectedRoute((prev) => [...prev, place]);
  };

  const removeFromRoute = (place: TouristPlace) => {
    setSelectedRoute((prev) => prev.filter((p) => p.id !== place.id));
  };

  const clearRoute = () => {
    setSelectedRoute([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isPlaceFavorite,
        selectedRoute,
        addToRoute,
        removeFromRoute,
        clearRoute,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

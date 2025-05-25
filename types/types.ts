import { ImageSourcePropType } from "react-native";

export interface ContactInfo {
  phone?: string;
  website?: string;
  email?: string;
  address?: string;
}

export type ImageSource = ImageSourcePropType;

export interface TouristPlace {
  id: string;
  name: string;
  description: string;
  images: ImageSource[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  rating?: number;
  openingHours?: string;
  contactInfo?: ContactInfo;
}

export interface Route {
  id: string;
  title: string;
  description: string;
  image: ImageSource;
  author: {
    id: string;
    name: string;
    avatar: ImageSource;
  };
  rating: number;
  category:
    | "nature"
    | "popular"
    | "architecture"
    | "culture"
    | "food"
    | "other";
  places: TouristPlace[];
  createdAt: string;
}

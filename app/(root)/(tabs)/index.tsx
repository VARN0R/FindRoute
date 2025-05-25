import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteCard } from "../../../components/RouteCard";
import { categories, mockRoutes } from "../../../constants/data";
import { Route } from "../../../types/types";

export default function Index() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const insets = useSafeAreaInsets();

  const filteredRoutes = mockRoutes.filter((route) => {
    const matchesSearch = route.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "popular" || route.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRoutePress = (route: Route) => {
    // TODO: Navigate to route details
    console.log("Route pressed:", route.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4" style={{ marginTop: insets.top }}>
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 font-rubik"
            placeholder="Поиск маршрутов..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? "bg-primary-300"
                  : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-rubik-medium ${
                  selectedCategory === category.id
                    ? "text-white"
                    : "text-gray-600"
                }`}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4">
            <RouteCard route={item} onPress={handleRoutePress} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

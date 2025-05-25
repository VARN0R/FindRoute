import { PlaceCard } from "@/components/PlaceCard";
import { PlaceDetails } from "@/components/PlaceDetails";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { TouristPlace } from "@/types/types";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Favorites = () => {
  const { user, favorites, removeFromFavorites } = useGlobalContext();
  const insets = useSafeAreaInsets();
  const [selectedPlace, setSelectedPlace] = React.useState<TouristPlace | null>(
    null
  );

  const handleCloseDetails = () => {
    setSelectedPlace(null);
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View
          className="flex flex-row items-center justify-between"
          style={{ marginTop: insets.top }}
        >
          <Text className="text-xl font-rubik-bold">Избранное</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        {favorites.length === 0 ? (
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-lg font-rubik text-black-200 text-center">
              У вас пока нет сохраненных мест
            </Text>
          </View>
        ) : (
          favorites.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onPress={setSelectedPlace}
              onRemove={removeFromFavorites}
            />
          ))
        )}
      </ScrollView>

      {selectedPlace && (
        <View className="absolute bottom-0 left-0 right-0 h-1/2 bg-white rounded-t-3xl shadow-lg">
          <PlaceDetails
            place={selectedPlace}
            onClose={handleCloseDetails}
            isSaved={true}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favorites;

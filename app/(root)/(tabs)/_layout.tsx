import icons from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabIconInterface {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

const TabIcon = (props: TabIconInterface) => {
  const { focused, icon, title } = props;

  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#0061FF" : "#666876"}
        className="size-6"
        resizeMode="contain"
      ></Image>
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-200 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

const RouteTabIcon = ({ focused }: { focused: boolean }) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <View className="size-6 flex items-center justify-center">
        <Ionicons
          name="navigate"
          size={24}
          color={focused ? "#0061FF" : "#666876"}
        />
      </View>
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-200 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        Маршрут
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          height: Platform.OS === "android" ? 70 + insets.bottom : 70,
          paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Главная" />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="map-routes"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.map} title="Карта" />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="route"
        options={{
          title: "Route",
          headerShown: false,
          tabBarIcon: ({ focused }) => <RouteTabIcon focused={focused} />,
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.heart} title="Избранное" />
          ),
        }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Профиль" />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;

import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

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

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
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

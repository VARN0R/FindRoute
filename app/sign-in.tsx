import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/"></Redirect>;

  const handleLogin = async () => {
    const result = await login();
    refetch();
    if (result) {
      console.log("Login Success");
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.logoWithBelarus}
          className="h-4/6 w-full"
          resizeMode="contain"
        />

        <View className="px-5">
          <Text className="text-base text-center font-rubik text-black-200">
            Добро пожаловать в FindRoute!
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Давайте спланируем{"\n"}
            <Text className="text-primary-300">
              идеальное путешествие{"\n"}
            </Text>
            вместе
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-6">
            Войти в FindRoute с помощью Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="ml-2 text-lg font-rubik-medium text-black-300 ml-2">
                Войти с Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;

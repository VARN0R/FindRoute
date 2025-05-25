import { createAccount, createEmailSession } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmailSignIn = () => {
  const { refetch } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailLogin = async () => {
    try {
      await createEmailSession(email, password);
      await refetch();
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to login. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    try {
      await createAccount(email, password, name);
      await handleEmailLogin();
    } catch (error) {
      Alert.alert("Error", "Failed to register. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="flex-1 justify-center py-10">
          <View className="px-5">
            <View className="mt-8 space-y-4">
              {isRegistering && (
                <View>
                  <Text className="text-base font-rubik-medium mb-2">Имя</Text>
                  <TextInput
                    className="w-full h-12 px-4 bg-accent-100 rounded-xl font-rubik"
                    placeholder="Введите ваше имя"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              )}
              <View>
                <Text className="text-base font-rubik-medium mb-2">Email</Text>
                <TextInput
                  className="w-full h-12 px-4 bg-accent-100 rounded-xl font-rubik"
                  placeholder="Введите ваш email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View>
                <Text className="text-base font-rubik-medium mb-2">Пароль</Text>
                <TextInput
                  className="w-full h-12 px-4 bg-accent-100 rounded-xl font-rubik"
                  placeholder="Введите ваш пароль"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity
              className="w-full h-12 bg-primary-300 rounded-xl mt-8 items-center justify-center"
              onPress={isRegistering ? handleRegister : handleEmailLogin}
            >
              <Text className="text-white font-rubik-medium text-base">
                {isRegistering ? "Зарегистрироваться" : "Войти"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-4"
              onPress={() => setIsRegistering(!isRegistering)}
            >
              <Text className="text-primary-300 font-rubik-medium text-center">
                {isRegistering
                  ? "Уже есть аккаунт? Войти"
                  : "Нет аккаунта? Зарегистрироваться"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailSignIn;

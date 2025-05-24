import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import { User } from "./global-provider";

// базовый конфиг
export const config = {
  platform: "com.varn0r.findroute",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

// инициализируем объект клиента из appwrite
export const client = new Client();

// инициализируем сам клиент нашими значениями
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

// аватар и аккаунт из appwrite
export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    // заготовка url, на который мы перенаправим пользователя после успешной авторизации
    const redirectUri = Linking.createURL("/");

    // выполняем авторизацию с помощью google
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("failed to login");

    // открываем окно авторизации в браузере,
    const browserResult = await openAuthSessionAsync(
      response.toString(), // URL, сгенерированный google, по которому пользователь должен пройти авторизацию
      redirectUri
    );

    // если авторизация неудачная, кидаем ошибка
    if (browserResult.type !== "success") throw new Error("Failed to login");

    // формируется url, из которого достаём нужные параметры для сессии
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("secret or userId not found");

    // создаём текущую сессию юзера
    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const result = await account.get();

    if (!result) return null;

    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

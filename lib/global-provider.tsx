import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

export interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  user: null,
  loading: false,
  refetch: async () => {},
});

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { data: user, loading, refetch } = useAppwrite({ fn: getCurrentUser });

  const isLoggedIn = !!user;

  // console.log(JSON.stringify(user, null, 2));  // вывод пользователя для проверки

  return (
    <GlobalContext.Provider value={{ isLoggedIn, user, loading, refetch }}>
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

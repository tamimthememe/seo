import { createContext, ReactNode, useEffect, useState } from "react";

interface UserContextType {
  userId: string | null;
  updateUserId: (newUserId: string | null) => void;
  isLoggedIn: boolean; // To check if the user is logged in
}

export const UserContext = createContext<UserContextType>({
  userId: null,
  updateUserId: () => {},
  isLoggedIn: false,
});

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Initialize userId from localStorage or default to null
  const [userId, setUserId] = useState<string | null>(() => {
    const savedUserId = localStorage.getItem("userId");
    return savedUserId ? savedUserId : null;
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  const updateUserId = (newUserId: string | null) => {
    setUserId(newUserId);
  };

  const isLoggedIn = !!userId;

  return (
    <UserContext.Provider value={{ userId, updateUserId, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

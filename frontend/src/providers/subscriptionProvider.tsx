import { createContext, ReactNode, useEffect, useState } from "react";

interface SubscriptionContextType {
  subscriptionId: string | null;
  plan: string | null;
  updateSubscriptionId: (newUserId: string | null) => void;
  updatePlan: (newUserId: string | null) => void;
}

export const SubscriptionContext = createContext<SubscriptionContextType>({
  subscriptionId: null,
  plan: null,
  updateSubscriptionId: () => {},
  updatePlan: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [subscriptionId, setSubscriptionId] = useState<string | null>(() => {
    const savedSubscriptionId = localStorage.getItem("subscriptionId");
    return savedSubscriptionId ? savedSubscriptionId : null;
  });

  const [plan, setPlan] = useState<string | null>(() => {
    const savedPlan = localStorage.getItem("plan");
    return savedPlan ? savedPlan : null;
  });

  useEffect(() => {
    if (subscriptionId) {
      localStorage.setItem("subscriptionId", subscriptionId);
    } else {
      localStorage.removeItem("subscriptionId");
    }
  }, [subscriptionId]);

  useEffect(() => {
    if (plan) {
      localStorage.setItem("plan", plan);
    } else {
      localStorage.removeItem("plan");
    }
  }, [plan]);

  const updateSubscriptionId = (newSubId: string | null) => {
    setSubscriptionId(newSubId);
  };

  const updatePlan = (newPlan: string | null) => {
    setPlan(newPlan);
  };

  return (
    <SubscriptionContext.Provider
      value={{ subscriptionId, updateSubscriptionId, plan, updatePlan }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

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

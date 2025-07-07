'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useGetProfileDataQuery } from '@/app/provider/Redux/service/profileApis';

type UserContextType = {
  currentUser: any;
};

const UserContext = createContext<UserContextType>({ currentUser: null });

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { data } = useGetProfileDataQuery();

  useEffect(() => {
    if (data) {
      setCurrentUser(data?.data);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

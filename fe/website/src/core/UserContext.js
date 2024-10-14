import React, { createContext, useContext, useState } from 'react';

// Tạo context
export const UserContext = createContext();

// Tạo provider để bao bọc các component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Khởi tạo trạng thái user là null

  const login = (data) => {
    setUser(data)
    console.log('LOGIN')
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    return useContext(UserContext)
}
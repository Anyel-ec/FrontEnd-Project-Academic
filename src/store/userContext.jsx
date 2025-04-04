import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../api/userService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('🔄 Buscando usuario en localStorage...');
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log('📦 Usuario almacenado:', storedUser);

        if (storedUser?.username) {
          const userData = await userService.getUser(storedUser.username);
          console.log('📡 Usuario desde API:', userData);

          if (!user || userData.id !== user?.id) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('❌ Error al obtener usuario:', error);
      } finally {
        setLoading(false);
        console.log('✅ Finalizó carga de usuario');
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

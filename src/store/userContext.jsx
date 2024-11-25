import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../api/userService'; // Asegúrate de importar el servicio correcto.

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser && storedUser.username) {
                    const userData = await userService.getUser(storedUser.username);
                    setUsername(userData?.username || ''); // Asegúrate de manejar datos nulos.
                } else {
                    console.error('No se encontró un usuario en localStorage');
                }
            } catch (error) {
                console.error('Error al obtener el username del usuario:', error);
            }
        };

        fetchUsername();
    }, []);

    return <UserContext.Provider value={username}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { setUser } from '../../../../store/userSlice'; // Importa la acción
import userService from '../../../../api/userService';

const TitleReservation = () => {
    const dispatch = useDispatch();
    const [user, setUserState] = useState({
        idUser: '',
        username: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser.username) {
                    const userData = await userService.getUser(storedUser.username);
                    setUserState(userData);

                    // Envía los datos al estado global
                    dispatch(setUser({ id: userData.idUser, username: userData.username }));
                } else {
                    console.error('No user found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [dispatch]);

    useEffect(() => {
        dispatch(setPageTitle('Subir PDF'));
    }, [dispatch]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Paso 1 - Subir Proyecto de Tesis</h1>
            {/* Otros componentes */}
        </div>
    );
};

export default TitleReservation;

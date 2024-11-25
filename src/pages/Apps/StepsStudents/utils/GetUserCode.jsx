import { useState } from "react";
const [user, setUser] = useState({
    idUser: '',
    username: '',
});
useEffect(() => {
    const fetchUserData = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.username) {
                const username = storedUser.username;
                const userData = await userService.getUser(username);
                setUser(userData);
            } else {
                console.error('No se encontró un usuario en localStorage');
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
        }
    };

    fetchUserData();
}, []);

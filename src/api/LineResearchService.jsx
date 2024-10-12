import axios from 'axios';
import AppEnvironments from '../config/AppEnvironments';

const RESEARCH_LINES_API_URL = `${AppEnvironments.baseUrl}api/v1/lineas-investigacion`;

// Obtener el token almacenado en localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Obtener las líneas de investigación filtradas por carrera
const getResearchLinesByCareer = async (careerId) => {
    try {
        const response = await axios.get(`${RESEARCH_LINES_API_URL}?careerId=${careerId}`, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
        });

        // Corregir el mapeo para que use la propiedad "name" que viene del backend
        return response.data.map((lineaInvestigacionData) => ({
            id: lineaInvestigacionData.id,
            nombre_linea_investigacion: lineaInvestigacionData.name, // Usar "name" en lugar de "nombre_linea_investigacion"
        }));
    } catch (error) {
        console.error('Error fetching research lines', error);
        throw error;
    }
};

export default {
    getResearchLinesByCareer,
};
    
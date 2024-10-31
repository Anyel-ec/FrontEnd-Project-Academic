import titleReservationsService from '../../../../api/titleReservationsService';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import ApprovalTable from './ApprovalTable';

const ProjectApproval = () => {
    const dispatch = useDispatch();
    const [reservacionesEstudiantes, setReservacionesEstudiantes] = useState([]);
    const [queryBusqueda, setQueryBusqueda] = useState('');

    const obtenerReservacionesTitulo = useCallback(async () => {
        try {
            const reservaciones = await titleReservationsService.getTitleReservations();

            // Filtrar las reservaciones para mostrar solo las que cumplen con los requisitos
            const reservacionesCumplenRequisitos = reservaciones
                .filter((reservacion) => reservacion.meetsRequirements) // Solo las que cumplen requisitos
                .flatMap((reservacion) => {
                    const entradaBase = {
                        ...reservacion,
                        estudiantes: [{ ...reservacion.student }],
                    };
                    if (reservacion.studentTwo) {
                        entradaBase.estudiantes.push({ ...reservacion.studentTwo });
                    }
                    return entradaBase;
                });

            // Filtrar estudiantes según el texto de búsqueda
            const reservacionesFiltradas = reservacionesCumplenRequisitos.filter((reservacion) =>
                reservacion.estudiantes.some(
                    (estudiante) =>
                        estudiante.firstNames.toLowerCase().includes(queryBusqueda.toLowerCase()) ||
                        estudiante.lastName.toLowerCase().includes(queryBusqueda.toLowerCase()) ||
                        estudiante.studentCode.toLowerCase().includes(queryBusqueda.toLowerCase())
                )
            );
            setReservacionesEstudiantes(reservacionesFiltradas);
        } catch (error) {
            console.error('Error al obtener las reservaciones de títulos:', error);
        }
    }, [queryBusqueda]);

    useEffect(() => {
        dispatch(setPageTitle('Detalles de Estudiantes - Paso 2'));
        obtenerReservacionesTitulo();
    }, [dispatch, obtenerReservacionesTitulo]);

    const formatearFecha = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    // const manejarCambioBusqueda = (event) => {
    //     setQueryBusqueda(event.target.value);
    // };

    return (
        <div className="pt-5">
            <div className="grid grid-cols-1 mb-5">
                        {/* <input
                            type="text"
                            className="form-input p-2 w-full mt-3"
                            placeholder="Buscar por nombre, apellido o código"
                            value={queryBusqueda}
                            onChange={manejarCambioBusqueda}
                            /> */}
                            <div className="mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Detalles de Estudiantes - Paso 2</h5>
                            </div>
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div className="mb-5">
                        <ApprovalTable
                            reservacionesEstudiantes={reservacionesEstudiantes}
                            formatearFecha={formatearFecha}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectApproval;
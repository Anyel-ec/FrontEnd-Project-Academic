import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import JuryTable from './JuryTable';
import juryAppointmentService from '../../../../api/juryAppointmentService';
import { useUserContext } from '../../../../store/userContext';
const JuryAppointment = () => {

  const dispatch = useDispatch();
  const [jury, setJury] = useState([]);
  const user = useUserContext();
  const [loading, setLoading] = useState(true);

  const fetchJurys = useCallback(async () => {

    try {
      setLoading(true);
      const juryResponse = await juryAppointmentService.getJuryByStudentCode(user.user.username);
      setJury(juryResponse);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    dispatch(setPageTitle('Aprobación de Proyecto'));
    if (user) {
      fetchJurys();
    }
  }, [dispatch, user, fetchJurys]);
  if (loading) {
    return <div>Cargando datos...</div>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Paso 3 - Designación de Jurados</h1>
      <JuryTable jury={jury} />
    </>
  );
};

export default JuryAppointment;


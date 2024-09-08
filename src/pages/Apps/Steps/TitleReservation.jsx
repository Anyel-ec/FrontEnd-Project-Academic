import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconUserPlus from '../../../components/Icon/IconUserPlus';
import IconListCheck from '../../../components/Icon/IconListCheck';
import IconLayoutGrid from '../../../components/Icon/IconLayoutGrid';
import IconSearch from '../../../components/Icon/IconSearch';
import IconUser from '../../../components/Icon/IconUser';
import IconFacebook from '../../../components/Icon/IconFacebook';
import IconInstagram from '../../../components/Icon/IconInstagram';
import IconLinkedin from '../../../components/Icon/IconLinkedin';
import IconTwitter from '../../../components/Icon/IconTwitter';
import IconX from '../../../components/Icon/IconX';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import IconCode from '../../../components/Icon/IconCode';
import Select from 'react-select';
import IconMail from '../../../components/Icon/IconMail';
import IconBolt from '../../../components/Icon/IconBolt';
import careerService from '../../../api/careerService';
// import studentCareerService from '../../../api/studentCareerService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spanish from 'flatpickr/dist/l10n/es.js';


const TitleReservation = () => {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [students, setStudents] = useState([]);

  // Cargar todas las carreras al montar el componente
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('/api/v1/carreras');  // Petición para obtener carreras
        const data = await response.json();
        setCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };

    fetchCareers();
  }, []);

  // Función para manejar el cambio de carrera
  const handleCareerChange = async (e) => {
    const careerId = e.target.value;
    setSelectedCareer(careerId);

    if (careerId) {
      try {
        const response = await fetch(`/api/v1/carreras/${careerId}/estudiantes`);  // Petición para obtener estudiantes por carrera
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    } else {
      setStudents([]);  // Si no hay carrera seleccionada, limpiar el select de estudiantes
    }
  };

  return (
    <div>
      <label>
        Selecciona una carrera:
        <select onChange={handleCareerChange} value={selectedCareer || ''}>
          <option value="">Selecciona una carrera</option>
          {careers.map((career) => (
            <option key={career.id} value={career.id}>
              {career.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Selecciona un estudiante:
        <select>
          <option value="">Selecciona un estudiante</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstNames} {student.lastName}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default TitleReservation;

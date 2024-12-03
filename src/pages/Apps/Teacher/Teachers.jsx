import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import teacherService from '../../../api/teacherService';
import careerService from '../../../api/careerService';
import Header from './TeacherHeader';
import TeacherTable from './TeacherTable';
import TeacherModal from './TeacherModal';
import { showMessage } from '../showMessage';

const Teachers = () => {
    const dispatch = useDispatch();

    const [addContactModal, setAddContactModal] = useState(false);
    const [careerOptions, setCareerOptions] = useState([]);
    const [contactList, setContactList] = useState([]);
    const [search, setSearch] = useState('');
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Docentes'));
        fetchCareers();
    }, [dispatch]);

    const fetchCareers = useCallback(async () => {
        try {
            const careers = await careerService.getCareers();
            const options = careers.map((career) => ({
                value: career.id,
                label: career.name,
                data: career,
            }));
            setCareerOptions(options);
        } catch (error) {

            console.error('Error fetching careers:', error);
        }
    }, []);

    const fetchTeachers = useCallback(async () => {
        try {
            const data = await teacherService.getTeachers();
            setContactList(data);
        } catch (error) {
            showMessage('Error al buscar docentes', 'error');
        }
    }, []);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const normalizeText = (text) => {
        return text
            .normalize('NFD') // Descompone caracteres acentuados en su forma básica
            .replace(/[\u0300-\u036f]/g, '') // Elimina los signos diacríticos
            .toLowerCase(); // Convierte a minúsculas
    };

    const filteredItems = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return contactList.filter((teacher) => {
            // Concatena el nombre completo antes de normalizar y comparar
            const fullName = `${teacher.firstNames} ${teacher.lastName}${teacher.middleName ? ' ' + teacher.middleName : ''}`;
            const normalizedFullName = normalizeText(fullName);

            // Normaliza y compara el DNI y el nombre completo
            const dniMatch = normalizeText(teacher.dni.toString()).includes(normalizedSearch);
            const fullNameMatch = normalizedFullName.includes(normalizedSearch);

            // Verifica si la carrera seleccionada coincide con la carrera del docente
            const matchesCareer = selectedCareer ? teacher.career?.id === selectedCareer.value : true;

            return (dniMatch || fullNameMatch) && matchesCareer;
        });
    }, [contactList, search, selectedCareer]); // Agrega 'selectedCareer' como dependencia


    const saveTeacher = async (values, { resetForm }) => {
        const payload = {
            ...values,
            career: {
                id: values.career.value,
                name: values.career.label,
                faculty: values.career.data.faculty,
            },
        };

        try {
            if (editingTeacher) {
                const updatedTeacher = await teacherService.editTeacher(editingTeacher.id, payload);
                setContactList((prev) => prev.map((teacher) => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)));
                showMessage('Docente actualizado exitosamente.');
            } else {
                const addedTeacher = await teacherService.addTeacher(payload);
                setContactList((prev) => [addedTeacher, ...prev]);
                showMessage('Docente agregado exitosamente.');
            }
            resetForm();
            closeModal();
        } catch (error) {
            console.error('Error guardando el docente:', error);
            if (error.response.status === 400) {
                showMessage('Campos duplicados. Por favor, corregirlos.', 'error');

            } else {
                showMessage('Error guardando el docente. Por favor, inténtalo de nuevo más tarde.', 'error');
            }
        }
    };

    const editUser = useCallback((teacher = null) => {
        setEditingTeacher(teacher);
        setAddContactModal(true);
    }, []);

    const deleteUser = useCallback(async (teacher) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Realmente quieres eliminar a este docente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡elimínalo!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await teacherService.deleteTeacher(teacher.id);
                setContactList((prev) => prev.filter((d) => d.id !== teacher.id));
                showMessage('El docente ha sido eliminado exitosamente.');
            } catch (error) {
                console.error('Error al eliminar docente:', error);
                showMessage('Error al eliminar el docente', 'error');
            }
        }
    }, []);

    const closeModal = useCallback(() => {
        setAddContactModal(false);
        setEditingTeacher(null);
    }, []);

    return (
        <div>
            <Header
                search={search}
                setSearch={setSearch}
                onAddTeacher={() => editUser()}
                selectedCareer={selectedCareer}
                setSelectedCareer={setSelectedCareer}
                careerOptions={careerOptions} // Asegúrate de que esto se está pasando correctamente
            />
            <TeacherTable teachers={filteredItems} onEdit={editUser} onDelete={deleteUser} />
            <TeacherModal isOpen={addContactModal} onClose={closeModal} onSave={saveTeacher} teacher={editingTeacher} careerOptions={careerOptions} />
        </div>
    );
};

export default Teachers;

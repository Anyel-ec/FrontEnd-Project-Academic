import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import Swal from 'sweetalert2';
import studentService from '../../../api/studentService';
import careerService from '../../../api/careerService';
import Header from './StudentHeader';
import StudentTable from './StudentTable';
import StudentModal from './StudentModal';
import { showMessage } from '../showMessage';

const Students = () => {
    const dispatch = useDispatch();

    const [addContactModal, setAddContactModal] = useState(false);
    const [careerOptions, setCareerOptions] = useState([]);
    const [contactList, setContactList] = useState([]);
    const [search, setSearch] = useState('');
    const [editingStudent, setEditingStudent] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null); // Estado para la carrera seleccionada

    useEffect(() => {
        dispatch(setPageTitle('Estudiantes'));
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

    const fetchStudents = useCallback(async () => {
        try {
            const data = await studentService.getStudents();
            setContactList(data);
        } catch (error) {
            showMessage('Error al buscar estudiantes', 'error');
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const normalizeText = (text) => {
        return text
            .normalize('NFD') // Descompone caracteres acentuados en su forma básica
            .replace(/[\u0300-\u036f]/g, '') // Elimina los signos diacríticos
            .toLowerCase(); // Convierte a minúsculas
    };

    const filteredItems = useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return contactList.filter((student) => {
            // Concatenación y normalización del nombre completo
            const fullName = `${student.firstNames} ${student.lastName}`;
            const normalizedFullName = normalizeText(fullName);

            // Normalización y comparación del código del estudiante y el DNI
            const studentCodeMatch = normalizeText(student.studentCode.toString()).includes(normalizedSearch);
            const dniMatch = normalizeText(student.dni.toString()).includes(normalizedSearch);

            // Chequea si el término de búsqueda coincide con el nombre completo, código del estudiante, o DNI
            const matchesSearch = normalizedFullName.includes(normalizedSearch) || studentCodeMatch || dniMatch;

            // Verifica si la carrera seleccionada coincide con la carrera del estudiante
            const matchesCareer = selectedCareer ? student.career?.id === selectedCareer.value : true;

            // Retorna verdadero si ambos criterios coinciden
            return matchesSearch && matchesCareer;
        });
    }, [contactList, search, selectedCareer]); // Agrega 'selectedCareer' como dependencia

    const saveStudent = async (values, { resetForm }) => {
        const payload = {
            ...values,
            gender: values.gender === 'true', // Convertir string a booleano
            career: {
                id: values.career.value,
                name: values.career.label,
                faculty: values.career.data.faculty,
            },
        };

        try {
            if (editingStudent) {
                const updatedStudent = await studentService.editStudent(editingStudent.id, payload);
                setContactList((prev) => prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
                showMessage('Estudiante actualizado exitosamente.');
            } else {
                const addedStudent = await studentService.addStudent(payload);
                setContactList((prev) => [addedStudent, ...prev]);
                showMessage('Estudiante agregado exitosamente.');
            }
            resetForm();
            closeModal();
        } catch (error) {
            console.error('Error guardando el estudiante:', error);
            if (error.response.status === 400) {
                showMessage('Campos duplicados. Por favor, corregirlos.', 'error');

            } else {
                showMessage('Error guardando el estudiante. Por favor, inténtalo de nuevo más tarde.', 'error');
            }
        }
    };

    const editUser = useCallback((student = null) => {
        setEditingStudent(student);
        setAddContactModal(true);
    }, []);

    const deleteUser = useCallback(async (student) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Realmente quieres eliminar a este estudiante?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡elimínalo!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await studentService.deleteStudent(student.id);
                setContactList((prev) => prev.filter((d) => d.id !== student.id));
                showMessage('El estudiante ha sido eliminado exitosamente.');
            } catch (error) {
                console.error('Error al eliminar estudiante:', error);
                showMessage('Error al eliminar el estudiante', 'error');
            }
        }
    }, []);

    const closeModal = useCallback(() => {
        setAddContactModal(false);
        setEditingStudent(null);
    }, []);

    return (
        <div>
            <Header
                search={search}
                setSearch={setSearch}
                onAddStudent={() => setAddContactModal(true)}
                careerOptions={careerOptions}
                selectedCareer={selectedCareer}
                setSelectedCareer={setSelectedCareer}
            />
            {/* <Header search={search} setSearch={setSearch} onAddStudent={() => editUser()} /> */}
            <StudentTable students={filteredItems} onEdit={editUser} onDelete={deleteUser} />
            <StudentModal isOpen={addContactModal} onClose={closeModal} onSave={saveStudent} student={editingStudent} careerOptions={careerOptions} />
        </div>
    );
};

export default Students;

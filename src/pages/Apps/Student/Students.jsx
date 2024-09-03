import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../store/themeConfigSlice";
import Swal from "sweetalert2";
import studentService from "../../../api/studentService";
import careerService from "../../../api/careerService";
import Header from "./Header";
import StudentTable from "./StudentTable";
import StudentModal from "./StudentModal";
import { showMessage } from "./showMessage";

const Students = () => {
    const dispatch = useDispatch();

    const [addContactModal, setAddContactModal] = useState(false);
    const [careerOptions, setCareerOptions] = useState([]);
    const [contactList, setContactList] = useState([]);
    const [search, setSearch] = useState("");
    const [editingStudent, setEditingStudent] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle("Estudiantes"));
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
            console.error("Error fetching careers:", error);
        }
    }, []);

    const fetchStudents = useCallback(async () => {
        try {
            const data = await studentService.getStudents();
            setContactList(data);
        } catch (error) {
            showMessage("Error al buscar estudiantes", "error");
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const filteredItems = useMemo(() => {
        return contactList.filter((student) =>
            `${student.firstNames} ${student.lastName}`.toLowerCase().includes(search.toLowerCase())
        );
    }, [contactList, search]);

    const saveStudent = async (values, { resetForm }) => {
        const payload = {
            ...values,
            gender: values.gender === "true",  // Convertir string a booleano   
            career: {
                id: values.career.value,
                name: values.career.label,
                faculty: values.career.data.faculty,
            },
        };

        try {
            if (editingStudent) {
                const updatedStudent = await studentService.editStudent(editingStudent.id, payload);
                setContactList((prev) =>
                    prev.map((student) =>
                        student.id === updatedStudent.id ? updatedStudent : student
                    )
                );
                showMessage("Estudiante actualizado exitosamente.");
            } else {
                const addedStudent = await studentService.addStudent(payload);
                setContactList((prev) => [addedStudent, ...prev]);
                showMessage("Estudiante agregado exitosamente.");
            }
            resetForm();
            closeModal();
        } catch (error) {
            console.error("Error guardando el estudiante:", error);
            showMessage("Error guardando el estudiante. Por favor, inténtalo de nuevo más tarde.", "error");
        }
    };

    const editUser = useCallback((student = null) => {
        setEditingStudent(student);
        setAddContactModal(true);
    }, []);

    const deleteUser = useCallback(async (student) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Realmente quieres eliminar a este estudiante?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡elimínalo!",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                await studentService.deleteStudent(student.id);
                setContactList((prev) => prev.filter((d) => d.id !== student.id));
                showMessage("El estudiante ha sido eliminado exitosamente.");
            } catch (error) {
                console.error("Error al eliminar estudiante:", error);
                showMessage("Error al eliminar el estudiante", "error");
            }
        }
    }, []);

    const closeModal = useCallback(() => {
        setAddContactModal(false);
        setEditingStudent(null);
    }, []);

    return (
        <div>
            <Header search={search} setSearch={setSearch} onAddStudent={() => editUser()} />
            <StudentTable students={filteredItems} onEdit={editUser} onDelete={deleteUser} />
            <StudentModal
                isOpen={addContactModal}
                onClose={closeModal}
                onSave={saveStudent}
                student={editingStudent}
                careerOptions={careerOptions}
            />
        </div>
    );
};

export default Students;

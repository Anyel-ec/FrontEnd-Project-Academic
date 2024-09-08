import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../store/themeConfigSlice";
import Swal from "sweetalert2";
import teacherService from "../../../api/teacherService";
import careerService from "../../../api/careerService";
import Header from "./Header";
import TeacherTable from "./TeacherTable";
import TeacherModal from "./TeacherModal";
import { showMessage } from "../showMessage";

const Teachers = () => {
    const dispatch = useDispatch();

    const [addContactModal, setAddContactModal] = useState(false);
    const [careerOptions, setCareerOptions] = useState([]);
    const [contactList, setContactList] = useState([]);
    const [search, setSearch] = useState("");
    const [editingTeacher, setEditingTeacher] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle("Docentes"));
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

    const fetchTeachers = useCallback(async () => {
        try {
            const data = await teacherService.getTeachers();
            setContactList(data);
        } catch (error) {
            showMessage("Error al buscar docentes", "error");
        }
    }, []);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const filteredItems = useMemo(() => {
        return contactList.filter((teacher) =>
            `${teacher.firstNames} ${teacher.lastName}`.toLowerCase().includes(search.toLowerCase())
        );
    }, [contactList, search]);

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
                setContactList((prev) =>
                    prev.map((teacher) =>
                        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
                    )
                );
                showMessage("Docente actualizado exitosamente.");
            } else {
                const addedTeacher = await teacherService.addTeacher(payload);
                setContactList((prev) => [addedTeacher, ...prev]);
                showMessage("Docente agregado exitosamente.");
            }
            fetchCareers();
            fetchTeachers();
            resetForm();
            closeModal();
        } catch (error) {
            console.error("Error guardando el docente:", error);
            showMessage("Error guardando el docente. Por favor, inténtalo de nuevo más tarde.", "error");
        }
    };

    const editUser = useCallback((teacher = null) => {
        setEditingTeacher(teacher);
        setAddContactModal(true);
    }, []);

    const deleteUser = useCallback(async (teacher) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Realmente quieres eliminar a este docente?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, ¡elimínalo!",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            try {
                await teacherService.deleteTeacher(teacher.id);
                setContactList((prev) => prev.filter((d) => d.id !== teacher.id));
                showMessage("El docente ha sido eliminado exitosamente.");
            } catch (error) {
                console.error("Error al eliminar docente:", error);
                showMessage("Error al eliminar el docente", "error");
            }
        }
    }, []);

    const closeModal = useCallback(() => {
        setAddContactModal(false);
        setEditingTeacher(null);
    }, []);

    return (
        <div>
            <Header search={search} setSearch={setSearch} onAddTeacher={() => editUser()} />
            <TeacherTable teachers={filteredItems} onEdit={editUser} onDelete={deleteUser} />
            <TeacherModal
                isOpen={addContactModal}
                onClose={closeModal}
                onSave={saveTeacher}
                teacher={editingTeacher}
                careerOptions={careerOptions}
            />
        </div>
    );
};

export default Teachers;
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../store/themeConfigSlice";
import InfoService from "../api/institucionalInfoService";
import IconCalendar from "../components/Icon/IconCalendar";
import IconUser from "../components/Icon/IconUser";
import Swal from "sweetalert2";

const InstitucionalInfo = () => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInfo = useCallback(async () => {
        try {
            setLoading(true);
            const response = await InfoService.getInfo();

            if (!response || Object.keys(response).length === 0) {
                // No hay datos aún
                setInfo({
                    id: null,
                    deanName: '',
                    commemorativeText: '',
                });
            } else {
                setInfo(response);
            }
        } catch (err) {
            console.error("Error al cargar la información institucional:", err);
            setError("Error inesperado al cargar la información institucional.");
        } finally {
            setLoading(false);
        }
    }, []);


    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Actualizar la información
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                deanName: info.deanName.trim(),
                commemorativeText: info.commemorativeText.trim(),
            };
    
            const updatedInfo = info.id
                ? await InfoService.updateInfo({ id: info.id, ...payload })
                : await InfoService.createInfo(payload); // 💥 asegúrate de tener este método en tu servicio
    
            setInfo(updatedInfo);
    
            Swal.fire({
                icon: "success",
                title: info.id ? "¡Actualización exitosa!" : "¡Información guardada!",
                text: "La información institucional se " + (info.id ? "actualizó" : "registró") + " correctamente.",
                confirmButtonText: "Aceptar",
            });
        } catch (error) {
            console.error("Error al guardar la información:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: "No se pudo guardar la información institucional.",
                confirmButtonText: "Intentar nuevamente",
            });
        }
    };
    

    useEffect(() => {
        dispatch(setPageTitle("Información de la Institución"));
        fetchInfo();
    }, [dispatch, fetchInfo]);

    if (loading) return <p>Cargando...</p>;
    return (
        <div className="pt-5">
            <div className="grid grid-cols-1 mb-5">
                <div className="panel lg:col-span-2 xl:col-span-3 rounded-xl">
                    <div className="mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Información Institucional
                        </h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="deanName">
                                Nombre del Decano de la Facultad de Ingeniería
                            </label>
                            <div className="flex">
                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                    <IconUser />
                                </div>
                                <input
                                    type="text"
                                    name="deanName"
                                    value={info.deanName}
                                    onChange={handleChange}
                                    placeholder="Nombre del Decano"
                                    className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                                />
                            </div>
                        </div>

                        {/* Campo para el Texto Conmemorativo */}
                        <div className="mb-5">
                            <label htmlFor="commemorativeText">
                                Nombre del Año Académico
                            </label>
                            <div className="flex">
                                <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                    <IconCalendar />
                                </div>
                                <input
                                    type="text"
                                    name="commemorativeText"
                                    value={info.commemorativeText}
                                    onChange={handleChange}
                                    placeholder="Texto Conmemorativo"
                                    className="form-input ltr:rounded-l-none rtl:rounded-r-none"
                                />
                            </div>
                        </div>

                        {/* Botón de Actualizar */}
                        <button
                            type="submit"
                            className="btn btn-primary py-[6px] px-[10px]"
                        >
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InstitucionalInfo;

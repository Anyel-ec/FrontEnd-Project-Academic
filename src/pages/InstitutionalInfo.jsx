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

    // Cargar la información al montar el componente
    const fetchInfo = useCallback(async () => {
        try {
            setLoading(true);
            const response = await InfoService.getInfo();
            setInfo(response);
        } catch (err) {
            console.error("Error al cargar la información institucional:", err);
            setError("No se pudo cargar la información institucional.");
        } finally {
            setLoading(false);
        }
    }, []);
    console.log(info);

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
            const updatedInfo = await InfoService.updateInfo({
                id: info.id,
                deanName: info.deanName.trim(),
                commemorativeText: info.commemorativeText.trim(),
            });
            console.log("Información actualizada:", updatedInfo);

            // SweetAlert para éxito
            Swal.fire({
                icon: "success",
                title: "¡Actualización exitosa!",
                text: "La información institucional se actualizó correctamente.",
                confirmButtonText: "Aceptar",
            });
        } catch (error) {
            console.error("Error al actualizar la información:", error);

            // SweetAlert para error
            Swal.fire({
                icon: "error",
                title: "Error al actualizar",
                text: "No se pudo actualizar la información institucional.",
                confirmButtonText: "Intentar nuevamente",
            });
        }
    };

    useEffect(() => {
        dispatch(setPageTitle("Información de la Institución"));
        fetchInfo();
    }, [dispatch, fetchInfo]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

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

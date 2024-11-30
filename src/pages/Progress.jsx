import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../store/themeConfigSlice";
import progressService from "../api/progressService";

const Progress = () => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProgress = useCallback(async () => {
        try {
            const data = await progressService.getAllprogress();
            // Filtrar estudiantes cuyo primer paso tenga más de 0%
            const filteredData = data.filter(
                (student) =>
                    student.progress.length > 0 &&
                    student.progress[0].completionPercentage > 0
            );
            setProgress(filteredData);
        } catch (error) {
            console.error("Error al obtener el progreso de estudiantes:", error);
        }
    }, []);

    useEffect(() => {
        dispatch(setPageTitle("Progreso de Estudiantes"));
        fetchProgress();
    }, [dispatch, fetchProgress]);

    const formatDate = (dateString) => {
        if (!dateString) return "No disponible";
        const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleString("es-ES", options);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProgress = progress.filter((student) =>
        student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-5">
            <div className="grid grid-cols-1 mb-5">
                <div className="panel lg:col-span-2 xl:col-span-3">
                    <div className="mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Progreso de Pasos
                        </h5>
                    </div>
                    <div className="mb-5">
                        {/* Barra de búsqueda */}
                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Buscar estudiante..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full bg-[#1a1a2e] text-white placeholder-gray-500"
                            />
                        </div>

                        <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                            <table className="whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th>Estudiante(s)</th>
                                        <th>Progreso</th>
                                        <th></th>
                                        <th>Fecha de Actualización</th>
                                    </tr>
                                </thead>
                                <tbody className="dark:text-white-dark">
                                    {filteredProgress.map((student) => (
                                        <React.Fragment key={student.studentCode}>
                                            {/* Nombre del estudiante como encabezado */}
                                            <tr>
                                                <td colSpan="4" className="font-bold">
                                                    {student.studentName || "Estudiante desconocido"}
                                                </td>
                                            </tr>
                                            {student.progress.map((step) => (
                                                <tr key={step.stepNumber}>
                                                    <td>{`Paso ${step.stepNumber}`}</td>
                                                    {/* Barra de progreso dinámica */}
                                                    <td>
                                                        <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                            <div
                                                                className={`rounded-full bg-${step.completionPercentage === 100
                                                                        ? "success"
                                                                        : step.completionPercentage >= 75
                                                                            ? "primary"
                                                                            : step.completionPercentage >= 30
                                                                                ? "warning"
                                                                                : "gray"
                                                                    }`}
                                                                style={{
                                                                    width: `${step.completionPercentage}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                    {/* Porcentaje del progreso */}
                                                    <td
                                                        className={`text-${step.completionPercentage === 100
                                                                ? "success"
                                                                : step.completionPercentage >= 75
                                                                    ? "primary"
                                                                    : step.completionPercentage >= 30
                                                                        ? "warning"
                                                                        : "gray"
                                                            }`}
                                                    >
                                                        {`${step.completionPercentage}%`}
                                                    </td>
                                                    {/* Fecha de última actualización */}
                                                    <td>{formatDate(step.updatedAt)}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Progress;

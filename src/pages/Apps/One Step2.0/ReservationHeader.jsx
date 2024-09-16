import React from "react";

const ReservationHeader = ({ search, setSearch, onAddReservation }) => {
    return (
        <div className="header flex justify-between items-center mb-4">
            {/* Campo de búsqueda */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar reservación por nombre del estudiante..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            {/* Botón para agregar nueva reservación */}
            <div className="add-reservation">
                <button
                    onClick={onAddReservation}
                    className="btn btn-primary"
                >
                    Agregar Reservación
                </button>
            </div>
        </div>
    );
};

export default ReservationHeader;

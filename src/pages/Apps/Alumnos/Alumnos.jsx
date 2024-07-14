// src/components/Alumnos.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { getAllAlumnos, createAlumno, updateAlumno, deleteAlumno } from '../Services/apiAlumnos';
import ContactList from './AlumnoList';
import ContactGrid from './AlumnoGrid';
import AlumnoForm from './AlumnoForm';

const Alumnos = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl';
    const [addContactModal, setAddContactModal] = useState(false);
    const [viewMode, setViewMode] = useState('list');
    const [search, setSearch] = useState('');
    const [alumnoList, setAlumnoList] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentAlumno, setCurrentAlumno] = useState(null);

    useEffect(() => {
        dispatch(setPageTitle('Alumnos'));
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const items = await getAllAlumnos();
        setAlumnoList(items);
        setFilteredItems(items);
    };

    useEffect(() => {
        setFilteredItems(alumnoList.filter((item) => item.firstNames.toLowerCase().includes(search.toLowerCase())));
    }, [search, alumnoList]);

    const handleSaveAlumno = async (params) => {
        if (params.id) {
            await updateAlumno(params.id, params);
        } else {
            await createAlumno(params);
        }
        fetchItems();
        setAddContactModal(false);
    };

    const handleEditAlumno = (alumno) => {
        setCurrentAlumno(alumno);
        setAddContactModal(true);
    };

    const handleDeleteAlumno = async (alumno) => {
        await deleteAlumno(alumno.id);
        fetchItems();
    };

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Alumnos</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <button type="button" className="btn btn-primary" onClick={() => handleEditAlumno(null)}>
                            Add Alumno
                        </button>
                        <button type="button" className={`btn btn-outline-primary p-2 ${viewMode === 'list' && 'bg-primary text-white'}`} onClick={() => setViewMode('list')}>
                            List View
                        </button>
                        <button type="button" className={`btn btn-outline-primary p-2 ${viewMode === 'grid' && 'bg-primary text-white'}`} onClick={() => setViewMode('grid')}>
                            Grid View
                        </button>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Search Alumnos" className="form-input py-2" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            {viewMode === 'list' ? (
                <ContactList items={filteredItems} onEdit={handleEditAlumno} onDelete={handleDeleteAlumno} />
            ) : (
                <ContactGrid items={filteredItems} onEdit={handleEditAlumno} onDelete={handleDeleteAlumno} />
            )}
            {addContactModal && <AlumnoForm alumno={currentAlumno} onSave={handleSaveAlumno} onCancel={() => setAddContactModal(false)} />}
        </div>
    );
};

export default Alumnos;

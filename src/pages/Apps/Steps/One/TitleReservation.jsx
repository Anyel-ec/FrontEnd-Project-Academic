import Header from './Header';
import TitleReservationForm from './TitleReservationForm';
import TitleReservationTable from './TitleReservationTable';
import { useCareers, useStudents, useTitleReservations } from './hooks';

const TitleReservation = () => {
    const { careerOptions, careerError } = useCareers();
    const { studentOptions, studentError, filteredStudentOptions, filterStudentsByCareer } = useStudents();
    const { titleReservations, reservationError } = useTitleReservations();

    const handleSubmit = (values) => {
        // Manejar el envío del formulario
        console.log('Form Values:', values);
    };

    return (
        <div>
            <Header />
            <TitleReservationForm
                careerOptions={careerOptions}
                studentOptions={studentOptions}
                filteredStudentOptions={filteredStudentOptions}
                filterStudentsByCareer={filterStudentsByCareer}
                handleSubmit={handleSubmit}
                careerError={careerError}
                studentError={studentError}
            />
            <TitleReservationTable reservations={titleReservations} />
            {reservationError && <div className="text-danger">{reservationError}</div>}
        </div>
    );
};

export default TitleReservation;

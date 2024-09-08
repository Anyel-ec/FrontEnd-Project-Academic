class Teacher {
    id: number;
    dni: string;
    firstNames: string;
    lastName: string;
    middleName: string;
    birthDate: string;  // Usamos string para fechas ya que así vienen en el JSON
    institutionalEmail: string;
    phone: string;
    address: string;
    career:  string;  // Añadimos la carrera como un objeto, puede ser null

    constructor(
        id: number,
        dni: string,
        firstNames: string,
        lastName: string,
        middleName: string,
        birthDate: string,
        institutionalEmail: string,
        phone: string,
        address: string,
        career: string   // Agregamos el objeto carrera
    ) {
        this.id = id;
        this.dni = dni;
        this.firstNames = firstNames;
        this.lastName = lastName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.institutionalEmail = institutionalEmail;
        this.phone = phone;
        this.address = address;
        this.career = career;  // Asignamos la carrera en el constructor
    }
}

export default Teacher;
    
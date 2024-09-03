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

    constructor(
        id: number,
        dni: string,
        firstNames: string,
        lastName: string,
        middleName: string,
        birthDate: string,
        institutionalEmail: string,
        phone: string,
        address: string
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
    }
}

export default Teacher;

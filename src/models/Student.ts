class Student {
    id: number;
    studentCode: string;
    dni: string;
    firstNames: string;
    lastName: string;
    middleName: string;
    birthDate: string;  // Usamos string para fechas ya que así vienen en el JSON
    email: string;
    phone: string;
    address: string;

    constructor(
        id: number,
        studentCode: string,
        dni: string,
        firstNames: string,
        lastName: string,
        middleName: string,
        birthDate: string,
        email: string,
        phone: string,
        address: string
    ) {
        this.id = id;
        this.studentCode = studentCode;
        this.dni = dni;
        this.firstNames = firstNames;
        this.lastName = lastName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}

export default Student;

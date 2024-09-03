class Student {
    id: number;
    studentCode: string;
    dni: string;
    firstNames: string;
    career: string;
    middleName: string;
    lastName: string;
    birthDate: string;
    email: string;
    phone: string;
    address: string;
    gender: boolean;

    constructor(
        id: number,
        studentCode: string,
        dni: string,
        firstNames: string,
        lastName: string,
        career: string,
        middleName: string,
        birthDate: string,
        email: string,
        phone: string,
        address: string,
        gender: boolean
    ) {
        this.id = id;
        this.studentCode = studentCode;
        this.dni = dni;
        this.firstNames = firstNames;
        this.lastName = lastName;
        this.career = career;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.gender = gender;
    }
}

export default Student;

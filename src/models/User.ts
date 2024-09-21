class User {
    idUser: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;


    constructor(
        idUser: number,
        username: string,
        firstName: string,
        lastName: string,
        email: string,

    ) {
        this.idUser = idUser;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;

    }
}

export default User;

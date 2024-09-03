import Faculty from "./Faculty";

class Carrer {

    id: number;
    name: string;
    faculty: Faculty;

    constructor(id: number, name: string, faculty: Faculty) {
        this.id = id;
        this.name = name;
        this.faculty = faculty;
    }

}


export default Carrer;

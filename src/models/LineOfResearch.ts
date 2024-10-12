import Career from "./Career";

class LineOfResearch {

    id: number;
    name: string;
    career: Career;

    constructor(id: number, name: string, career: Career) {
        this.id = id;
        this.name = name;
        this.career = career;
    }

}


export default LineOfResearch;

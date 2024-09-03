class StudentCareer {
    studentId: number;
    careerId: number;
    project: boolean

    constructor(studentId: number, careerId: number, project: boolean) {
        this.studentId = studentId;
        this.careerId = careerId;
        this.project = project;
    }
}

export default StudentCareer;

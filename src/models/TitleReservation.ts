class TitleReservation {
    id: number;
    meetsRequirements: boolean;
    student: string;
    project: boolean;
    observations: string;
    createdAt: string;
    updatedAt: string;

    constructor(
        id: number,
        meetsRequirements: boolean,
        student: string,
        project: boolean,
        observations: string,
        createdAt: string,
        updatedAt: string

    ) {
        this.id = id;
        this.meetsRequirements = meetsRequirements;
        this.student = student;
        this.project = project;
        this.observations = observations;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default TitleReservation;

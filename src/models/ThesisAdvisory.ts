class ThesisAdvisory {
    id: number;
    coAdviser: string;
    thesisTitle: string;
    startDate: Date;
    extensionDate?: Date;
    endDate: Date;
    reservationTitle: number;
    filterCertificate: number;
    thesisApproval: number;
    juryDesignation: number;
    juryRecomposition: number;
    firstReview: number;
    lastReview: number;
    extensionPeriod: number;
    presentationCertificate: number;
    presentationDate: number;
    juryNotification: number;
    presentationApproval: number;
    bindingDeliveryCertificate: number;
    teacherCareer: number ;
    studentCareer: number;

    constructor(
        id: number,
        coAdviser: string,
        thesisTitle: string,
        startDate: Date,
        endDate: Date,
        reservationTitle: number,
        filterCertificate: number,
        thesisApproval: number,
        juryDesignation: number,
        juryRecomposition: number,
        firstReview: number,
        lastReview: number,
        extensionPeriod: number,
        presentationCertificate: number,
        presentationDate: number,
        juryNotification: number,
        presentationApproval: number,
        bindingDeliveryCertificate: number,
        teacherCareer: number,
        studentCareer: number,
        extensionDate?: Date
    ) {
        this.id = id;
        this.coAdviser = coAdviser;
        this.thesisTitle = thesisTitle;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reservationTitle = reservationTitle;
        this.filterCertificate = filterCertificate;
        this.thesisApproval = thesisApproval;
        this.juryDesignation = juryDesignation;
        this.juryRecomposition = juryRecomposition;
        this.firstReview = firstReview;
        this.lastReview = lastReview;
        this.extensionPeriod = extensionPeriod;
        this.presentationCertificate = presentationCertificate;
        this.presentationDate = presentationDate;
        this.juryNotification = juryNotification;
        this.presentationApproval = presentationApproval;
        this.bindingDeliveryCertificate = bindingDeliveryCertificate;
        this.teacherCareer = teacherCareer;
        this.studentCareer = studentCareer;
        this.extensionDate = extensionDate;
    }
}

export default ThesisAdvisory;

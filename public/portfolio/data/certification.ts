export type Certification = {
    id: string; 
    name: string; 
    issuer: string; 
    date: string; 
    credentialUrl: string; 
};

export const certifications: Certification[] = [
    {
        id: "google-it-support", 
        name: "Google IT Support Professional Certificate",
        issuer: "Google/Coursera",
        date: "May 2026",
        credentialUrl: "verification link"
    },
    {
        id: "udemy-sql", 
        name: "course title",
        issuer: "Udemy",
        date: "Update",
        credentialUrl: "verification link"
    },
]

export const clearances = [
    {
        label:"National Police Check",
        status:"Current",
    },
    {
        label:"Working with Children Check",
        status:"Current",
    },
];


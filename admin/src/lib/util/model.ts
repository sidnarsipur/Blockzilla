export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Rule {
    id: string;
    userID: string;
    name: string;
    description: string;
    enabled: boolean;
    blockedWords: string[];
    timestamp: number;
    timeFrom: string;
    timeTo: string;
    days: string[];
}

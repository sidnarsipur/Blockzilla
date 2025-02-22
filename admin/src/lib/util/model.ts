export interface User {
    id: string;
    name: string;
    email: string;
    rules: Rule[];
}

export interface Rule {
    id: string;
    name: string;
    description: string;
    blockedWords: string[];
}

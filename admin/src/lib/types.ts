export interface Chat {
    message: string;
    isUser: boolean;
    rule?: Rule;
}

export interface Rule {
    name: string;
    description: string;
}

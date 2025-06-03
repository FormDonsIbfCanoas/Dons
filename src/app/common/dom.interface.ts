export interface IDon {
    id: number;
    name: string;
    questions: number[];
    description: string;
    howToUseIt: string;
    biblicalVerses: string;
}

export interface IDonScore extends IDon {
    score: number;
}

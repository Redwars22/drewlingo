export interface IStoreActions {
    updateData: (newData: IDrewlingo) => void;
}

export type TCourse = "regentish" | "crvenagorski" | "shatan";

export interface IDrewlingo {
    points: number;
    course: TCourse;
    lives: number;
    progress: number;
    learnedWords: ILearnedWords[];
}

export type ILearnedWords = {
    translation: string;
    pronunciation: string;
    token: string;
}

export type TSuccess = "success" | "fail";
export interface IStoreActions {
    updateData: (newData: IDrewlingo) => void;
}

export type TCourse = "regentish" | "crvenagorski" | "shatan";

export interface IDrewlingo {
    points: number;
    course: TCourse;
    lives: number;
    progress: number;
}
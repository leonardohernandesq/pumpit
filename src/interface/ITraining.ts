export interface ITraining{
    id?:string;
    title?: string;
    objective?: string;
    members?: string;
    checked?: boolean;
    id_user: string;
    dateini?: string;
    datefim?: string;
    exercise?: [{
        descanso?: string;
        exercise?: string;
        observation?: string;
        position?: string;
        repetition?: string;
        series?: string
    }]
}
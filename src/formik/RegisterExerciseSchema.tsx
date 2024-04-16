import * as Yup from "yup";

export const RegisterExerciseSchema = Yup.object().shape({
    exercise: Yup.string(),
    position: Yup.string(),
    series: Yup.string().required("Séries é obrigatório"),
    repetition: Yup.string().required("Repetições é obrigatório"),
    descanso: Yup.string().required("Descanso é obrigatório"),
    observation: Yup.string(),
});

    export const initialValues = {
        exercise: "",
        position: "",
        series: "",
        repetition: "",
        descanso: "",
        observation: "",
    };

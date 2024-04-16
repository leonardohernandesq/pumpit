import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
    altura: Yup.string(),
    bf: Yup.string(),
    metabf: Yup.string(),
    metamm: Yup.string(),
    metapeso: Yup.string(),
    mm: Yup.string(),
    name: Yup.string(),
    nascimento: Yup.string(),
    peso: Yup.string(),
});

export const initialValues = {
    altura: '',
    bf: '',
    metabf: '',
    metamm: '',
    metapeso: '',
    mm: '',
    name: '',
    nascimento: '',
    peso: '',
};

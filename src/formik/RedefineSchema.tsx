import * as Yup from "yup";

export const RedefineSchema = Yup.object().shape({
    email: Yup.string().email().required("Email é obrigatório"),
});

export const initialValues = {
    email: "",
};

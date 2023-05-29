import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email().required("Email é obrigatório"),

  password: Yup.string().required("Senha é obrigatória"),

  confirmPassword: Yup.string().required("Senha é obrigatória"),
});

export const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email é obrigatório"),

  password: Yup.string().required("Senha é obrigatória"),
});

export const initialValues = {
  email: "",
  password: "",
};

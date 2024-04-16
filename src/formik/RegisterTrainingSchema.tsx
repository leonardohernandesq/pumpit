import * as Yup from "yup";

export const RegisterTrainingSchema = Yup.object().shape({
  objective: Yup.string().required("Objetivo é obrigatório"),
  title: Yup.string().required("Digite um título para seu treino"),
  members: Yup.string().required("Membros é obrigatório"),
  dateini: Yup.date().required("Data é obrigatória"),
  datefim: Yup.date().required("Vencimento é obrigatória"),
  checked: Yup.boolean(),
});

export const initialValues = {
  title: "",
  objective: "",
  members: "",
  dateini: "",
  datefim: "",
  checked: false,
};

import { useHistory, useParams } from "react-router-dom";
import {
  FormField,
  StyledButton,
  EntryTitle,
  EntryForm,
} from "../CommonStyles";

export default function NewEntry() {
  const history = useHistory();
  const { type } = useParams();
  if (type !== "income" && type !== "outcome") {
    history.push("/main");
  }
  return (
    <>
      <EntryTitle>Nova {type === "income" ? " entrada" : " saída"}</EntryTitle>

      <EntryForm>
        <FormField placeholder="Valor"></FormField>
        <FormField placeholder="Descrição"></FormField>
        <StyledButton>
          Salvar {type === "income" ? "entrada" : "saída"}
        </StyledButton>
        <StyledButton onClick={() => history.push("/main")}>
          Voltar
        </StyledButton>
      </EntryForm>
    </>
  );
}

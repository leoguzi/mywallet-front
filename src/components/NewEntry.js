import { useHistory, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { registerEntry } from "../services/api.service";
import UserContext from "../contexts/UserContext";
import Loader from "react-loader-spinner";
import {
  FormField,
  StyledButton,
  EntryTitle,
  EntryForm,
  InvalidDataWarning,
} from "../CommonStyles";

export default function NewEntry() {
  const history = useHistory();
  const { type } = useParams();
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const { user } = useContext(UserContext);

  if (type !== "income" && type !== "outcome") {
    history.push("/main");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const finalNumber = Number(value.replace(",", ".")) * 100;
    if (finalNumber === 0 || isNaN(finalNumber) || description.length === 0) {
      setInvalidData(true);
      setDisabled(false);
    } else {
      const entry = {
        value: finalNumber,
        description,
      };
      registerEntry(user.token, entry);
      history.push("/main");
    }
  }

  return (
    <>
      <EntryTitle>Nova {type === "income" ? " entrada" : " saída"}</EntryTitle>
      <EntryForm onSubmit={handleSubmit}>
        <FormField
          disbled={disabled}
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></FormField>
        <FormField
          disbled={disabled}
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></FormField>
        {invalidData && (
          <InvalidDataWarning>Verifique os dados inseridos!</InvalidDataWarning>
        )}
        <StyledButton disbled={disabled}>
          {disabled ? (
            <Loader type="ThreeDots" color="#ffffff" height="45px" />
          ) : (
            `Salvar ${type === "income" ? "entrada" : "saída"}`
          )}
        </StyledButton>
        <StyledButton onClick={() => history.push("/main")}>
          Voltar
        </StyledButton>
      </EntryForm>
    </>
  );
}

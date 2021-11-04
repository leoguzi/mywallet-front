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
  const [invalidData, setInvalidData] = useState({
    value: false,
    description: false,
  });
  const { user } = useContext(UserContext);

  if ((type !== "income" && type !== "outcome") || !type) {
    history.push("/main");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    let finalNumber = Number(value.replace(",", ".")) * 100;
    if (type === "outcome" && finalNumber > 0) {
      finalNumber = finalNumber * -1;
    }
    if (finalNumber < 0 && type === "income") {
      setInvalidData({ ...invalidData, value: true });
      setDisabled(false);
    } else if (
      finalNumber === 0 ||
      isNaN(finalNumber) ||
      description.length === 0
    ) {
      setInvalidData({ ...invalidData, value: true });
      setDisabled(false);
    } else {
      const entry = {
        value: finalNumber,
        description,
      };
      registerEntry(user.token, entry)
        .then(() => history.push("/main"))
        .catch(handleError);
    }
  }
  function handleError(e) {
    const status = e.response.status;
    if (status === 400) {
      setInvalidData({ ...invalidData, description: true });
    }
    setDisabled(false);
  }
  return (
    <>
      <EntryTitle>Nova {type === "income" ? " entrada" : " saída"}</EntryTitle>
      <EntryForm onSubmit={handleSubmit}>
        <FormField
          disbled={disabled}
          placeholder="Valor"
          value={value}
          invalid={invalidData.value}
          onChange={(e) => {
            setValue(e.target.value);
            setInvalidData({ ...invalidData, value: false });
          }}
        />
        {invalidData.value && (
          <InvalidDataWarning>
            Deve ser um número diferente de 0!
          </InvalidDataWarning>
        )}
        <FormField
          disbled={disabled}
          placeholder="Descrição"
          value={description}
          invalid={invalidData.description}
          onChange={(e) => {
            setDescription(e.target.value);
            setInvalidData({ ...invalidData, description: false });
          }}
        />
        {invalidData.description && (
          <InvalidDataWarning>
            Deve ter pelo menos 3 e menos que 50 caracteres!
          </InvalidDataWarning>
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

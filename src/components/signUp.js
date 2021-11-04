import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../services/api.service";
import Loader from "react-loader-spinner";
import {
  MainTitle,
  SignUpContainer,
  FormField,
  StyledLink,
  StyledButton,
  InvalidDataWarning,
} from "../CommonStyles";

export default function SignUp() {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [invalidData, setInvalidData] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const passwordMatch = formFields.password === formFields.passwordConfirm;
    if (!passwordMatch) {
      setInvalidData({ ...invalidData, passwordConfirm: true });
    }
    if (formFields.name.length < 3) {
      setInvalidData({ ...invalidData, name: true });
    }
    if (
      formFields.name &&
      formFields.email &&
      formFields.password &&
      formFields.passwordConfirm &&
      passwordMatch
    ) {
      const userData = {
        name: formFields.name,
        email: formFields.email,
        password: formFields.password,
        passwordConfirm: formFields.passwordConfirm,
      };
      registerUser(userData).then(redirect).catch(handleError);
    } else {
      setDisabled(false);
    }
  }

  function handleError(e) {
    if (e.response.status === 409) {
      setInvalidData({ ...invalidData, email: true });
      setDisabled(false);
    }
  }

  function redirect() {
    setDisabled(false);
    history.push("/");
  }

  return (
    <SignUpContainer>
      <MainTitle>MyWallet</MainTitle>
      <form onSubmit={handleSubmit}>
        <FormField
          required
          disabled={disabled}
          type="text"
          value={formFields.name}
          placeholder="Nome"
          invalid={invalidData.name}
          onChange={(e) => {
            setFormFields({ ...formFields, name: e.target.value });
            setInvalidData({ ...invalidData, name: false });
          }}
        />
        {invalidData.name && (
          <InvalidDataWarning>
            Nome deve ter mais de 3 caracteres!
          </InvalidDataWarning>
        )}
        <FormField
          required
          disabled={disabled}
          type="email"
          placeholder="E-mail"
          value={formFields.email}
          invalid={invalidData.email}
          onChange={(e) => {
            setFormFields({ ...formFields, email: e.target.value });
            setInvalidData({ ...invalidData, email: false });
          }}
        />
        {invalidData.email && (
          <InvalidDataWarning>Email já cadastrado!</InvalidDataWarning>
        )}
        <FormField
          required
          disabled={disabled}
          type="password"
          placeholder="Senha"
          value={formFields.password}
          onChange={(e) =>
            setFormFields({ ...formFields, password: e.target.value })
          }
        />
        <FormField
          required
          disabled={disabled}
          type="password"
          placeholder="Confirme a senha"
          value={formFields.passwordConfirm}
          invalid={invalidData.passwordConfirm}
          onChange={(e) => {
            setFormFields({ ...formFields, passwordConfirm: e.target.value });
            setInvalidData({ ...invalidData, passwordConfirm: false });
          }}
        />
        {invalidData.passwordConfirm && (
          <InvalidDataWarning>As senhas não coincidem!</InvalidDataWarning>
        )}
        <StyledButton disabled={disabled}>
          {disabled ? (
            <Loader type="ThreeDots" color="#ffffff" height="45px" />
          ) : (
            "Cadastrar"
          )}
        </StyledButton>
      </form>
      <Link to="/">
        <StyledLink>Já tem uma conta? Entre agora!</StyledLink>
      </Link>
    </SignUpContainer>
  );
}

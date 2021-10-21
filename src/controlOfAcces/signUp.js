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
} from "./controlOfAccesStyles";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    const passwordMatch = password === confirmPassword;
    if (name && email && password && confirmPassword && passwordMatch) {
      const userData = {
        name,
        email,
        password,
        confirmPassword,
      };
      registerUser(userData)
        .then(() => redirect)
        .catch((e) => console.log(e.response.status));
    } else {
      setInvalidData(true);
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
          disabled={disabled}
          type="text"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <FormField
          disabled={disabled}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          disabled={disabled}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormField
          disabled={disabled}
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <InvalidDataWarning>
          {invalidData ? "Verifique os dados!" : ""}
        </InvalidDataWarning>
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

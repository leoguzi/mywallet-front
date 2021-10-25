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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
    const passwordMatch = password === passwordConfirm;
    if (!passwordMatch) {
      setInvalidData({ ...invalidData, passwordConfirm: true });
    }
    if (name.length < 3) {
      setInvalidData({ ...invalidData, name: true });
    }
    if (name && email && password && passwordConfirm && passwordMatch) {
      const userData = {
        name,
        email,
        password,
        passwordConfirm,
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
          disabled={disabled}
          type="text"
          value={name}
          placeholder="Nome"
          invalid={invalidData.name}
          onChange={(e) => {
            setName(e.target.value);
            setInvalidData({ ...invalidData, name: false });
          }}
        />
        {invalidData.name && (
          <InvalidDataWarning>
            Nome deve ter mais de 3 caracteres!
          </InvalidDataWarning>
        )}
        <FormField
          disabled={disabled}
          type="email"
          placeholder="E-mail"
          value={email}
          invalid={invalidData.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setInvalidData({ ...invalidData, email: false });
          }}
        />
        {invalidData.email && (
          <InvalidDataWarning>Email já cadastrado!</InvalidDataWarning>
        )}
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
          value={passwordConfirm}
          invalid={invalidData.passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
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

import { useContext, useState } from "react";
import userContext from "../contexts/UserContext";
import { Link, useHistory } from "react-router-dom";
import { serverLogin } from "../services/api.service";
import Loader from "react-loader-spinner";
import {
  MainTitle,
  LoginContainer,
  FormField,
  InvalidDataWarning,
  StyledLink,
  StyledButton,
} from "../CommonStyles";

export default function Login() {
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    if (email && password) {
      const userData = { email, password };
      serverLogin(userData)
        .then((res) => login(res.data))
        .catch(handleError);
    } else {
      setInvalidData(true);
      setDisabled(false);
    }
  }

  function handleError(e) {
    if (e.response.status === 404) {
      setInvalidData(true);
      setDisabled(false);
    }
  }

  function login(user) {
    setUser(user);
    setDisabled(false);
    history.push("/main");
  }

  return (
    <LoginContainer>
      <MainTitle>MyWallet</MainTitle>
      <form onSubmit={handleSubmit}>
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
        {invalidData && (
          <InvalidDataWarning>Verifique os dados! </InvalidDataWarning>
        )}
        <StyledButton disabled={disabled}>
          {disabled ? (
            <Loader type="ThreeDots" color="#ffffff" height="45px" />
          ) : (
            "Entrar"
          )}
        </StyledButton>
      </form>
      <Link to="/sign-up">
        <StyledLink>Primeira vez? Cadastre-se!</StyledLink>
      </Link>
    </LoginContainer>
  );
}

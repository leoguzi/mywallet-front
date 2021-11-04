import { useContext, useEffect, useState } from "react";
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
  const [invalidData, setInvalidData] = useState({
    email: false,
    password: false,
  });
  const history = useHistory();

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser) {
      setUser(authUser);
      history.push("/main");
    }
  }, [setUser, history]);

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
    const status = e.response.status;
    if (status === 404) {
      setInvalidData({ invalidData, email: true });
    } else if (status === 401) {
      setInvalidData({ ...invalidData, password: true });
    }
    setDisabled(false);
  }

  function login(user) {
    setUser(user);
    setDisabled(false);
    localStorage.setItem("authUser", JSON.stringify(user));
    history.push("/main");
  }

  return (
    <LoginContainer>
      <MainTitle>MyWallet</MainTitle>
      <form onSubmit={handleSubmit}>
        <FormField
          required
          disabled={disabled}
          type="email"
          placeholder="E-mail"
          value={email}
          invalid={invalidData.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setInvalidData({ invalidData, email: false });
          }}
        />
        {invalidData.email && (
          <InvalidDataWarning>Email não encontrado! </InvalidDataWarning>
        )}
        <FormField
          required
          disabled={disabled}
          type="password"
          placeholder="Senha"
          value={password}
          invalid={invalidData.password}
          onChange={(e) => {
            setPassword(e.target.value);
            setInvalidData({ invalidData, password: false });
          }}
        />
        {invalidData.password && (
          <InvalidDataWarning>Senha inválida! </InvalidDataWarning>
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

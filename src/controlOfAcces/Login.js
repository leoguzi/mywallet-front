import { useContext, useState } from "react";
import userContext from "../contexts/UserContext";
import { Link, useHistory } from "react-router-dom";
import { serverLogin } from "../services/api.service";
import Loader from "react-loader-spinner";
import {
  MainTitle,
  Container,
  FormField,
  StyledLink,
  StyledButton,
} from "./controlOfAccesStyles";

export default function Login() {
  const { setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    if (email && password) {
      const userData = { email, password };
      serverLogin(userData)
        .then((res) => login(res.data))
        .catch((e) => console.log(e.response.status));
    } else {
      alert("Digite todos os dados!");
      setDisabled(false);
    }
  }

  function login(user) {
    setUser(user);
    setDisabled(false);
    history.push("/main");
  }

  return (
    <Container>
      <MainTitle>MyWallet</MainTitle>
      <form onSubmit={handleSubmit}>
        <FormField
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></FormField>
        <FormField
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></FormField>
        <StyledButton>
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
    </Container>
  );
}

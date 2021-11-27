import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import userContext from '../contexts/UserContext';
import { serverLogin } from '../services/api.service';
import {
  MainTitle,
  LoginContainer,
  FormField,
  InvalidDataWarning,
  StyledLink,
  StyledButton,
} from '../CommonStyles';

export default function Login() {
  const { setUser, user } = useContext(userContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [invalidData, setInvalidData] = useState({
    email: false,
    password: false,
  });
  const history = useHistory();

  if (user) {
    history.push('/main');
  }

  function login(loginData) {
    setDisabled(false);
    localStorage.setItem('authUser', JSON.stringify(loginData));
    setUser(loginData);
    history.push('/main');
  }

  function handleError(e) {
    const { status } = e.response;
    if (status === 404) {
      setInvalidData({ invalidData, email: true });
    } else if (status === 401) {
      setInvalidData({ ...invalidData, password: true });
    }
    setDisabled(false);
  }

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

  return (
    <LoginContainer>
      <MainTitle>MyWallet</MainTitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormField
          required
          disabled={disabled}
          type='email'
          placeholder='E-mail'
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
          type='password'
          placeholder='Senha'
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
            <Loader type='ThreeDots' color='#ffffff' height='45px' />
          ) : (
            'Entrar'
          )}
        </StyledButton>
      </form>
      <Link to='/sign-up'>
        <StyledLink>Primeira vez? Cadastre-se!</StyledLink>
      </Link>
    </LoginContainer>
  );
}

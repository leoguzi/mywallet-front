import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GlobalStyle } from './globalStyles';
import Login from './components/Login';
import SignUp from './components/signUp';
import NewEntry from './components/NewEntry';
import Main from './components/Main';
import UserContext from './contexts/UserContext';

function App() {
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path='/' exact component={Login} />
          <Route path='/sign-up' exact component={SignUp} />
          <Route path='/main' exact component={Main} />
          <Route path='/new-entry/:type' exact component={NewEntry} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

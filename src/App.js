import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/signUp";
import NewEntry from "./components/NewEntry";
import Main from "./components/Main";
import UserContext from "./contexts/UserContext";

function App() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      authUser ? setUser(authUser) : history?.push("/");
    }
  }, [user, history]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/main" exact component={Main} />
          <Route path="/new-entry/:type" exact component={NewEntry} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

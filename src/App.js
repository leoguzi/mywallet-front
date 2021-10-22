import { GlobalStyle } from "./globalStyles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/signUp";
import NewEntry from "./components/NewEntry";
import Main from "./components/Main";
import UserContext from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/main" exact component={Main} />
          <Route path="/new-entry" exact component={NewEntry} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

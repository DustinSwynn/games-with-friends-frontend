import { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Masthead from "./components/Masthead";
import Navbar from "./components/Navbar";
import LoginButton from "./auth/LoginButton";
import LogoutButton from './auth/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import Codenames from './pages/Codenames/Codenames';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';
import { ROOT_PATHS } from './utils/constants';
import { postLogin } from './clientAPIs/login';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Code within useEffect will run after the user is redirected after login is complete
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      postLogin(user.name, user.nickname, user.email, user.sub)
    }
  }, [isLoading]);

  return (
    <div className="App">
      <Masthead />
      <Navbar />
      <LoginButton />
      <LogoutButton />
      <Router>
        <div>
          <Switch>
            {/* <Route
              exact
              path={ROOT_PATHS.INDEX}
              component={<HomePage />}
            /> */}
            <Route path={ROOT_PATHS.CODENAMES}>
              <Codenames />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

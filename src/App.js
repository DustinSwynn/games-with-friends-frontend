// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Codenames from './pages/Codenames/Codenames';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';

import { ROOT_PATHS } from './utils/constants';
import { postLogin } from './clientAPIs/login';
import Masthead from './components/Masthead';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/Profile/Profile';
import ProfileMenu from './components/ProfileMenu';
// import BattleShip from './pages/Battleship/Battleship';

const useStyles = () => ({
  wrapper: css({
    // width: "100%",
    height: "100%",
    // padding: "20px",
    // boxShadow: "0px 0px 5px 0px #000",
    // overflow: "auto"
  })
});

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const styles = useStyles();

  // Code within useEffect will run after the user is redirected after login is complete
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      postLogin(user.name, user.nickname, user.email, user.sub);
    }
  }, [isLoading, isAuthenticated]);

  return (
    <div className="App">
      <Router>
      <Masthead />
      <Navbar />
        <div css={styles.wrapper}>
          <Switch>
            <Route exact path={ROOT_PATHS.INDEX}>
              <LandingPage />
            </Route>
            <Route path={ROOT_PATHS.CODENAMES}>
              <Codenames />
            </Route>
            {/* <Route path={ROOT_PATHS.BATTLESHIP}>
              <BattleShip />
            </Route> */}
            <Route path={ROOT_PATHS.PROFILE}>
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Codenames from './pages/Codenames/Codenames';
import Battleship from './pages/Battleship/Battleship';

import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from 'react-router-dom';

import { ROOT_PATHS } from './utils/constants';
import { postLogin } from './clientAPIs/profile';
import Masthead from './components/Masthead';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Chat from './pages/Chat';
import Profile from './pages/Profile/Profile';
import ProfileMenu from './components/ProfileMenu';
import socketClient from 'socket.io-client'

const useStyles = () => ({
  wrapper: css({
    height: "100%",
  })
});

// const CHATSERVER = "http://localhost:8081";
const CHATSERVER = "https://backend-dot-second-folio-294223.nn.r.appspot.com";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const styles = useStyles();

  var socket = socketClient(CHATSERVER);
  socket.on('connection', () => {
    console.log(`I'm connected with the back-end`);
  });

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
      {/* </Router> */}
        <div css={styles.wrapper}>
          <Switch>
            <Route exact path={ROOT_PATHS.INDEX}>
              <LandingPage />
            </Route>
            <Route path={ROOT_PATHS.CODENAMES}>
              <Codenames />
            </Route>
            <Route path={ROOT_PATHS.BATTLESHIP}>
              <Battleship />
            </Route>
            <Route path={ROOT_PATHS.PROFILE}>
              <Profile />
            </Route>
            <Route path={ROOT_PATHS.CHAT}>
              <Chat />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

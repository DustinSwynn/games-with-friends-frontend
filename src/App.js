import logo from './logo.svg';
import './App.css';
import Masthead from "./components/Masthead";
import Navbar from "./components/Navbar";
import LoginButton from "./auth/LoginButton";
import LogoutButton from './auth/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("isAuthenticated?", isAuthenticated);
  console.log("USER", user);
  
  return (
    <div className="App">
      <Masthead />
      <Navbar />
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './componets/views/LandingPage/LandingPage';
import LoginPage from './componets/views/LoginPage/LoginPage';
import RegisterPage from './componets/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
function App() {
  
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false); 

  return (
    <Router>
    <div>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Routes>
          <Route path="/" element={ <AuthLandingPage /> } />
          <Route path="/login" element={ <AuthLoginPage /> }/>
          <Route path="/register" element={ <AuthRegisterPage /> } />
      </Routes>
    </div>
  </Router>
  );
}

export default App;

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
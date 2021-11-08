import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
<<<<<<< HEAD
import Login from './pages/login';
import Home from './pages/home';
import MostrarUsuarios from './components/MostrarUsuarios';
import NuevoPaciente from './components/NuevoPaciente/NuevoPaciente';
import BuscarPaciente from './components/BuscarPaciente/BuscarPaciente';
=======
import Login from "./pages/login";
import Home from "./pages/home/home";
import MostrarUsuarios from "./components/MostrarUsuarios";
import NuevoPaciente from "./components/NuevoPaciente/NuevoPaciente";
import BuscarPaciente from "./components/BuscarPaciente/BuscarPaciente";
import Dashboard from "./components/Dashboard/Dashboard";
>>>>>>> main

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/MostrarUsuarios" component={MostrarUsuarios} />
        <Route exact path="/NuevoPaciente" component={NuevoPaciente} />
        <Route exact path="/BuscarPaciente" component={BuscarPaciente} />
        <Route exact path="/Estadisticas" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

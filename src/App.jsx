import { SiReacthookform } from "react-icons/si";
import { Outlet } from "react-router-dom";
import NavLinks from "./components/Nav/NavLinks";
import "./app.css";

import Logo from "../public/nadando.svg";

function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="header-title">
          <SiReacthookform className="icon" />
          <h1 className="title">Cadastro de alunos para aulas de natação</h1>
          <div className="container-img">
            <img src={Logo} alt="Logo" className="image-logo" />
          </div>
        </div>
        <NavLinks />
      </header>

      <Outlet />
    </div>
  );
}

export default App;

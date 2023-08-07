import { SiReacthookform } from "react-icons/si";
import { Outlet } from "react-router-dom";
import NavLinks from "./components/Nav/NavLinks";
import "./app.css";
function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="header-title">
          <SiReacthookform className="icon" />
          <h1 className="title">Cadastro de alunos para aulas de natação</h1>
        </div>
        <NavLinks />
      </header>
      <Outlet />
    </div>
  );
}

export default App;

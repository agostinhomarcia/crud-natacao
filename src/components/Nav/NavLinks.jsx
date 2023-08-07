import { Link } from "react-router-dom";
import "./nav.css";

const NavLinks = () => {
  return (
    <nav className="nav">
      <Link to="/students" className="link">
        Listagem de Alunos
      </Link>
      <Link to="/add" className="link">
        Cadastrar Novo Aluno
      </Link>
    </nav>
  );
};

export default NavLinks;

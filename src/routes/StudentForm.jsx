import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import "../formStyles.css";

const initialNewStudent = {
  name: "",
  phone: "",
  registrationDate: "",
  knowsSwimming: "",
  desiredDayOfWeek: "",
  skillLevel: "",
  preferredPeriod: "",
};

export default function StudentForm() {
  const [student, setStudent] = useState(initialNewStudent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      phone,
      registrationDate,
      knowsSwimming,
      desiredDayOfWeek,
      skillLevel,
      preferredPeriod,
    } = student;

    try {
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(collection(db, "student"), {
        name,
        phone,
        registrationDate: new Date(registrationDate).getTime(),
        knowsSwimming,
        desiredDayOfWeek,
        skillLevel,
        preferredPeriod,
      });

      setStudent(initialNewStudent);

      toast.success("Aluno cadastrado!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: numericValue,
      }));
    } else {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  return (
    <div className="form-container" onSubmit={handleSubmit}>
      <ToastContainer />
      <form className="form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Telefone"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="date"
            placeholder="Data do Cadastro"
            name="registrationDate"
            value={student.registrationDate}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="input-wrapper">
          <label className="block mb-2">Sabe nadar?</label>
          <select
            name="knowsSwimming"
            value={student.knowsSwimming}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Selecione</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label className="block mb-2">Dia da Semana Desejado</label>
          <select
            name="desiredDayOfWeek"
            value={student.desiredDayOfWeek}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Selecione</option>
            <option value="Segunda-feira">Segunda-feira</option>
            <option value="Terça-feira">Terça-feira</option>
            <option value="Quarta-feira">Quarta-feira</option>
            <option value="Quinta-feira">Quinta-feira</option>
            <option value="Sexta-feira">Sexta-feira</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label className="block mb-2">Nível de Habilidade</label>
          <select
            name="skillLevel"
            value={student.skillLevel}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Selecione</option>
            <option value="Iniciante">Iniciante (Touca Azul)</option>
            <option value="Intermediário">Intermediário (Touca Amarela)</option>
            <option value="Avançado">Avançado (Touca Vermelha)</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label className="block mb-2">Período Preferido</label>
          <select
            name="preferredPeriod"
            value={student.preferredPeriod}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Selecione</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noturno">Noturno</option>
          </select>
        </div>

        <button className="submit-button" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

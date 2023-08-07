import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../edit.css";

const EditStudent = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    registrationDate: "",
    knowsSwimming: "",
    desiredDayOfWeek: "",
    skillLevel: "",
    preferredPeriod: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "student", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const registrationDate = new Date(data.registrationDate);
          const formattedDate = registrationDate.toISOString().split("T")[0];
          setFormData({ ...data, registrationDate: formattedDate });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "student", id);
      await updateDoc(docRef, formData);
      history("/");
      toast.success("Editado com sucesso");
    } catch (error) {
      console.error("Error updating student data:", error);
      toast.error("Erro ao editar");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2 className="text">Editar Aluno</h2>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="input-wrapper">
          <input
            type="date"
            placeholder="Data do Cadastro"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="input-wrapper">
          <label className="block mb-2">Sabe nadar?</label>
          <select
            name="knowsSwimming"
            value={formData.knowsSwimming}
            onChange={handleChange}
            className="input"
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
            value={formData.desiredDayOfWeek}
            onChange={handleChange}
            className="select"
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
            value={formData.skillLevel}
            onChange={handleChange}
            className="select"
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
            value={formData.preferredPeriod}
            onChange={handleChange}
            className="select"
          >
            <option value="">Selecione</option>
            <option value="Vespertino">Vespertino</option>
            <option value="Noturno">Noturno</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditStudent;

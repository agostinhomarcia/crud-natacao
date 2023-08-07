import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../listStyles.css";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "student"));
        const studentData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = async (id) => {
    if (!id) {
      return false;
    }

    history(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "student", id));
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar aluno: ", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text">Lista de Alunos</h2>
      <div>
        <table className="">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Data de Cadastro</th>
              <th>Sabe Nadar?</th>
              <th>Dia da Semana Desejado</th>
              <th>Período Preferido</th>
              <th>Nível de Habilidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } text-slate-900 hover:bg-gray-200`}
              >
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>
                  {new Date(student.registrationDate).toLocaleDateString()}
                </td>
                <td>{student.knowsSwimming}</td>
                <td>{student.desiredDayOfWeek}</td>
                <td>{student.preferredPeriod}</td>
                <td>{student.skillLevel}</td>
                <td>
                  <div className="button">
                    <button
                      onClick={() => handleEdit(student.id)}
                      className="blue-button"
                    >
                      <BsPencil size={15} />
                      Editar
                    </button>
                  </div>
                  <div className="button">
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="red-button"
                    >
                      <BsTrash size={15} />
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;

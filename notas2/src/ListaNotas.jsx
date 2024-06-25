import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ListaNotas = () => {
  const [notas, setNotas] = useState([]);
  const [showListaNotas, setShowListaNotas] = useState(true); // Estado para mostrar/ocultar ListaNotas
  const [editMode, setEditMode] = useState(false); // Estado para controlar el modo de edición
  const [editId, setEditId] = useState(""); // Estado para almacenar el ID de la nota en edición
  const [tituloEditado, setTituloEditado] = useState(""); // Estado para el título editado
  const [contenidoEditado, setContenidoEditado] = useState(""); // Estado para el contenido editado
  const [fechaEditada, setFechaEditada] = useState(""); // Estado para la fecha editada

  useEffect(() => {
    // Fetch the data from your backend server
    fetch("http://localhost:3000/api/notas")
      .then((response) => response.json())
      .then((data) => {
        setNotas(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const toggleListaNotas = () => {
    setShowListaNotas((prevShow) => !prevShow); // Alternar entre mostrar y ocultar ListaNotas
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notas/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the deleted note from state
        const updatedNotas = notas.filter((nota) => nota.id !== id);
        setNotas(updatedNotas);
        alert("Nota eliminada exitosamente");
      } else {
        alert("Error al eliminar la nota");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (id) => {
    // Find the note to edit based on ID
    const notaToEdit = notas.find((nota) => nota.id === id);
    if (notaToEdit) {
      setEditMode(true);
      setEditId(id);
      setTituloEditado(notaToEdit.titulo);
      setContenidoEditado(notaToEdit.contenido);
      setFechaEditada(notaToEdit.fecha);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notas/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: tituloEditado,
            contenido: contenidoEditado,
            fecha: fechaEditada,
          }),
        }
      );

      if (response.ok) {
        const updatedNotas = notas.map((nota) =>
          nota.id === editId
            ? {
                ...nota,
                titulo: tituloEditado,
                contenido: contenidoEditado,
                fecha: fechaEditada,
              }
            : nota
        );
        setNotas(updatedNotas);
        setEditMode(false);
        setEditId("");
        alert("Nota actualizada exitosamente");
      } else {
        console.error(
          "Failed to update note. Server returned:",
          response.status,
          response.statusText
        );
        alert("Error al actualizar la nota");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleToggleCompletion = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notas/${noteId}`, {
        method: "PATCH", // Using PATCH method to update specific fields
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completado: !notas.find((nota) => nota.id === noteId).completado,
        }),
      });
      
      if (response.ok) {
        const updatedNotas = notas.map((nota) =>
          nota.id === noteId ? { ...nota, completado: !nota.completado } : nota
        );
        setNotas(updatedNotas);
        alert("Estado de la nota actualizado exitosamente");
      } else {
        alert("Error al actualizar el estado de la nota");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Notas Guardadas</h2>
              <button
                className="btn btn-primary mb-3"
                onClick={toggleListaNotas}
              >
                {showListaNotas ? "Ocultar Notas" : "Mostrar Notas"}
              </button>
              {showListaNotas && (
                <ul className="list-group">
                  {notas.map((nota) => (
                    <li key={nota.id} className="list-group-item">
                      {editMode && editId === nota.id ? (
                        <div>
                          <h3>Editar Nota</h3>
                          <input
                            type="text"
                            value={tituloEditado}
                            onChange={(e) => setTituloEditado(e.target.value)}
                            className="form-control mb-2"
                            placeholder="Editar título"
                            required
                          />
                          <textarea
                            value={contenidoEditado}
                            onChange={(e) =>
                              setContenidoEditado(e.target.value)
                            }
                            className="form-control mb-2"
                            placeholder="Editar contenido"
                            required
                          ></textarea>
                          <input
                            type="date"
                            value={fechaEditada}
                            onChange={(e) => setFechaEditada(e.target.value)}
                            className="form-control mb-2"
                          />
                          <button
                            className="btn btn-success mr-2"
                            onClick={handleUpdate}
                          >
                            Guardar
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setEditMode(false)}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div>
                          <h3>{nota.titulo}</h3>
                          <p>{nota.contenido}</p>
                          <p>{nota.fecha}</p>
                          <button
                            className="btn btn-info mr-2"
                            onClick={() => handleEdit(nota.id)}
                          >
                            Editar
                          </button>
                          <button
                            className={`btn ${
                              nota.completado ? "btn-success" : "btn-secondary"
                            }`}
                            onClick={() => handleToggleCompletion(nota.id)}
                          >
                            {nota.completado
                              ? "Completado"
                              : "Marcar como completado"}
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(nota.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaNotas;

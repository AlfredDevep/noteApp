import React from "react";
import { useState } from "react";
import App from "./App";
import ListaNotas from "./ListaNotas";

export const NotasForm = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [fecha, setFecha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo,
          contenido,
          fecha,
        }),
      });

      if (response.ok) {
        // Limpiar los campos después de guardar la nota
        setTitulo("");
        setContenido("");
        setFecha("");
        alert("Nota guardada exitosamente");
      } else {
        alert("Error al guardar la nota");
      }
    } catch (error) {
      console.error("Error al guardar la nota:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Agregar Nota</h2>
              <form onSubmit={handleSubmit}>
                <section>
                  <h3>Titulo</h3>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="form-control"
                    placeholder="Escribe el título de tu nota aquí..."
                    required
                  />
                </section>
                <section>
                  <h3>Notas</h3>
                  <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    className="form-control"
                    placeholder="Escribe tu nota aquí..."
                    required
                  ></textarea>
                </section>
                <section>
                  <h3>Fecha</h3>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="form-control"
                  />
                </section>
                <br />
                <button type="submit" className="btn btn-primary">
                  Guardar Nota
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Import BrowserRouter, Switch, and Route

import "bootstrap/dist/css/bootstrap.min.css";

import ListaNotas from "./ListaNotas";
import { NotasForm } from "./NotasForm";

function App() {
  return (
    <div className="container m-79">
      <BrowserRouter>
        <div className="App">
          <div className="container ">
            {/* Navigation Links */}
            <nav className="navbar d-flex justify-content-space-around mt-4">
              <Link to="/" className="btn btn-primary">
                Come Home
              </Link>{" "}
              {/* Button to go home */}
              <Link to="/lista" className="btn btn-secondary">
                Go to List
              </Link>{" "}
              {/* Button to go to list */}
            </nav>
            <Routes>
              {" "}
              {/* Use Routes instead of Switch */}
              <Route exact path="/" element={<NotasForm />} />
              <Route path="/lista" element={<ListaNotas />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

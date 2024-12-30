import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CrearMovie = () => {
  const navigate = useNavigate();
  const backurl = import.meta.env.VITE_BACK_URL;
  const [titulo, setTitulo] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [genero, setGenero] = useState("");
  const { accessToken, handleRefreshToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movie = {
      title: titulo,
      description: descripcion,
      gender: genero,
      image: imagen,
      publishDate: publishDate,
    };

    let respuesta = await fetchback(movie);
    if (respuesta === -1) {
      respuesta = await fetchback(movie);
    }
    if (respuesta.status === "success") {
      toast.success("Película creada");
      navigate("/mis-movies");
    } else {
      toast.error("Película no creada");
    }
  };

  const fetchback = async (movie) => {
    const response = await fetch(`${backurl}movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(movie),
    });
    if (response.status === 401) {
      const res = await handleRefreshToken();
      if (res === -1) {
        navigate("/login");
      }
    }
    const responsejson = await response.json();
    if (response.ok) {
      return responsejson;
    } else {
      return { status: false, error: responsejson.error || "Error en la solicitud" };
    }
  };

  return (
  <div className="container">
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Crear Movie</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    className="form-control"
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ingresa el título"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="genero" className="form-label">
                    Género
                  </label>
                  <input
                    type="text"
                    id="genero"
                    className="form-control"
                    onChange={(e) => setGenero(e.target.value)}
                    placeholder="Ingresa el género"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="publishDate" className="form-label">
                    Fecha de Publicación
                  </label>
                  <input
                    type="date"
                    id="publishDate"
                    className="form-control"
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    className="form-control"
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows="4"
                    placeholder="Escribe una descripción"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="imagen" className="form-label">
                    Link de la Imagen
                  </label>
                  <input
                    type="text"
                    id="imagen"
                    className="form-control"
                    onChange={(e) => setImagen(e.target.value)}
                    placeholder="Ingresa el enlace de la imagen"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Crear Película
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CrearMovie;

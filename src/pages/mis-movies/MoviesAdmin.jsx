import "./../Home/Blogs.css";
import { Link } from "react-router-dom";
const MovieAdmin = ({ movie ,handleDelete}) => {
  console.log(movie);

    const eliminarMovie = () => {
        handleDelete(movie.id)

    }

  return (
    <div className="contenedorCard">
      <img src={movie.image} alt={movie.title} className="imagen" />
      <div className="Datos">
        <h2 className="Titulo">{movie.title}</h2>
        <div className="subtitulo">
          <p className="autor">{movie.gender|| "Genero por defecto"}</p>
          <p>{new Date(movie.publishDate).toLocaleString("es")}</p>
        </div>
        <p className="autor">{movie.description}</p>
        <Link to={`/modificar-movies/${movie.id}`}>
          <button>Modificar</button>
        </Link>
        <button onClick={()=>eliminarMovie()}> Eliminar</button>
      </div>
    </div>
  );
};

export default MovieAdmin;

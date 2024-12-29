import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Movie.css";

const Movie = ({ movie }) => {
  return (
    <div className="container my-4">
      <div className="card mb-3 movie-card" style={{ maxWidth: "100%" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={movie.image}
              className="img-fluid rounded-start movie-image"
              alt={movie.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-primary">{movie.title}</h5>
              <p className="card-text">
                <strong>Género:</strong> {movie.gender || "Sin género"}
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Fecha de publicación:{" "}
                  {new Date(movie.publishDate).toLocaleDateString("es", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </p>
              <p className="card-text movie-description">
                {movie.description}
              </p>
              <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

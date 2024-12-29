import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";
import "./DetalleMovie.css";

const DetalleMovie = () => {
  const backurl = import.meta.env.VITE_BACK_URL;
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const { accessToken,handleRefreshToken } = useContext(AuthContext);
  const fetchback = async () => {
    const response = await fetch(`${backurl}movies/populado/${id}`);
    const responsejson = await response.json();
    setMovie(responsejson.data);
  };
  useEffect(() => {
    fetchback();
  }, [id]);

  // Calcular el promedio de las estrellas
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0; // Si no hay ratings, devolver 0
    const totalStars = ratings.reduce((acc, rating) => acc + rating.stars, 0);
    return totalStars / ratings.length;
  };
  const getUserIdFromToken = (accessToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      return decoded.id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };
  // Enviar la votación al servidor
  const submitRating = async (stars) => {
    try {
      const user_id = getUserIdFromToken(accessToken);
      setIsSubmitting(true);
      const response = await fetch(`${backurl}rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: accessToken },
        body: JSON.stringify({
          stars: stars,
          user: user_id,
          movie: movie._id,
        }),
      });
      if (response.status === 401) {
        console.log("Token expirado");
        const res = await handleRefreshToken();
        console.log(res)
        if (res === -1) {
          navigate("/login");
        }
      }
  
      if (response.ok) {
        const newRating = await response.json();
        toast.success("¡Votación enviada con éxito!");
        await fetchback();
        console.log(movie)
      } else {
        console.error("Error al enviar la votación");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtener estrellas interactivas basadas en la valoración promedio
  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const handleStarClick = (starValue) => {
      if (isSubmitting) return; // Evitar múltiples envíos mientras se procesa
      setUserRating(starValue);
      submitRating(starValue);
    };

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FontAwesomeIcon
              key={`full-star-${index}`}
              icon={faStar}
              className={`text-warning clickable-star`}
              onClick={() => handleStarClick(index + 1)}
            />
          ))}
        {halfStar && (
          <FontAwesomeIcon
            key="half-star"
            icon={faStarHalfAlt}
            className={`text-warning clickable-star`}
            onClick={() => handleStarClick(fullStars + 1)}
          />
        )}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FontAwesomeIcon
              key={`empty-star-${index}`}
              icon={faRegStar}
              className={`text-warning clickable-star`}
              onClick={() => handleStarClick(fullStars + index + 1 + (halfStar ? 1 : 0))}
            />
          ))}
      </>
    );
  };

  const averageRating = calculateAverageRating(movie.ratings);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={movie.image}
            alt={movie.title}
            className="img-fluid w-100 movie-image"
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-primary">{movie.title}</h2>
          <div className="subtitulo mb-3">
            <p className="autor">{movie.gender || "Género por defecto"}</p>
            <p>
              <small className="text-muted">
                {new Date(movie.publishDate).toLocaleDateString("es", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </p>
          </div>
          <p className="movie-description">{movie.description}</p>

          <div className="ratings mb-3">
            <h5>Valoración Promedio:</h5>
            {getStars(averageRating)} {averageRating.toFixed(1)}
          </div>

          <Link to={`/`} className="btn btn-secondary mt-3">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetalleMovie;

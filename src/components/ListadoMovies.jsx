import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Movie from "../pages/Home/Movies";

const ListadoMovies = ({ isLogged = false, userId = null }) => {
  const backurl = import.meta.env.VITE_BACK_URL;
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [moviesAmount, setMoviesAmount] = useState(0);
  const moviesPerPage = 1;

  const fetchMovies = async (page) => {
    const response = await fetch(`${backurl}movies/filter?page=${page}&limit=${moviesPerPage}`);
    const responseJson = await response.json();

    const { movies, movies_amount, pages_amount, actual_page } = responseJson.data;

    setMovies(movies);
    setMoviesAmount(movies_amount);
    setTotalPages(pages_amount);
    setCurrentPage(Number(actual_page));
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

  const fetchUserRatedMovies = async () => {
    const decodeToken = getUserIdFromToken(userId);
    const response = await fetch(`${backurl}rating/${decodeToken}`);
    const responseJson = await response.json();
    const ratedMovies = responseJson.data.map((rating) => rating.movie);
    setMovies(ratedMovies);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      fetchMovies(pageNumber);
    }
  };

  useEffect(() => {
    if (!userId) {
      fetchMovies(currentPage);
    } else {
      fetchUserRatedMovies();
    }
  }, [currentPage]); // Cambia cuando la página actual se actualiza

  return (
    <div className="container">

      {movies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}

      {/* Paginación */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ListadoMovies;

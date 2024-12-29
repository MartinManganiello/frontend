import ListadoMovies from "../../components/ListadoMovies";

const accessToken = localStorage.getItem("accessToken");

const MisMovies = () => {

  return (
    <div>
      <h1>Peliculas votadas por mi</h1>
      <ListadoMovies isLogged={true} userId={accessToken}/>
    </div>
  );
};

export default MisMovies;

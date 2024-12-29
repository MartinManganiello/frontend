import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import DetalleMovie from "./pages/Home/DetalleMovie";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {AuthProvider} from "./context/AuthContext";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CrearMovie from "./pages/crear-movie/CrearMovie";
import MisMovies from "./pages/mis-movies/MisMovies";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movies/:id" element={<DetalleMovie />} />
          <Route path="/crear-movie" element={<CrearMovie/>} />
          <Route path="/mis-movies" element={<MisMovies/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
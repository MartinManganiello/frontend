import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { setIsLogged, setAccessToken, setRefreshToken } = useContext(AuthContext);
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLoginBack = async () => {
    const data = {
      username: usuario,
      password: contraseña,
    };
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usuario.length > 0 && contraseña.length > 0) {
      const response = await handleLoginBack();
      const responsejson = await response.json();
      if (!response.ok) {
        toast.error("Usuario o contraseña incorrecto");
      } else {
        toast.success("Sesión iniciada");
        setIsLogged(true);
        setRefreshToken(responsejson.data.refreshtoken);
        setAccessToken(responsejson.data.accesstoken);
        navigate("/");
      }
    } else {
      toast.error("Ingrese usuario y contraseña");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form className="w-100" style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            className="form-control"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="contraseña"
            className="form-control"
            placeholder="Ingrese su contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;

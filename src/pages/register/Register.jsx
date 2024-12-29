import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [contraseña2, setContraseña2] = useState("");
  const navigate = useNavigate();

  const handleRegisterBack = async (data) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responsejson = await response.json();
    if (response.ok) {
      toast.success("Usuario creado");
      navigate("/login");
    } else {
      toast.error(responsejson.message || "Error al crear usuario");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usuario === "" || email === "" || fecha === "" || contraseña === "" || contraseña2 === "") {
      toast.error("Complete los campos para continuar");
    } else if (contraseña !== contraseña2) {
      toast.error("Las contraseñas no coinciden");
    } else {
      const data = {
        username: usuario,
        email,
        birthDate: fecha,
        password: contraseña,
      };
      await handleRegisterBack(data);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Registrarse</h1>
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="fecha"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="pass"
            className="form-control"
            placeholder="Ingrese su contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pass2" className="form-label">
            Repetir Contraseña
          </label>
          <input
            type="password"
            id="pass2"
            className="form-control"
            placeholder="Repita su contraseña"
            value={contraseña2}
            onChange={(e) => setContraseña2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;

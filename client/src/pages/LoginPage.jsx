import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

// URL del backend desde .env
const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // 1️⃣ Guardar token
        storeToken(response.data.authToken);

        // 2️⃣ Decodificar token y guardar user en contexto
        authenticateUser();

        // 3️⃣ Redirigir al dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        const message =
          error.response?.data?.message || "Error al iniciar sesión";
        setErrorMessage(message);
      });
  };

  return (
    <div className="CohortCreatePage p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleLoginSubmit}
        className="grid grid-cols-1 gap-4 overflow-y-auto mt-12 px-4"
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Login
        </h3>

        <label className="text-gray-600 font-bold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          required
        />

        <label className="text-gray-600 font-bold">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Log In
        </button>

        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
      </form>

      <p className="mt-6 text-center">
        Don&apos;t have an account yet?{" "}
        <Link to="/signup" className="text-blue-500 font-bold">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;

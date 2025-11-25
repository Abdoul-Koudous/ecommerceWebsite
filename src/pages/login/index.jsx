import React, { useState, useContext } from "react";
import "./login.scss";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";

import { postData } from "../utils/api";
import { ToastContext } from "../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress/CircularProgress";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { openToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    postData("/api/users/login", {
      email,
      password,
    })
      .then((res) => {
        if (res?.success === true) {
          openToast("success", res?.message);

          // sauvegarde du user dans localStorage si tu veux
          localStorage.setItem("accesstoken", res?.data?.accesstoken);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);
          localStorage.setItem("userEmail", email);

          navigate("/"); // ou une autre page
        } else {
          openToast("error", res?.message);
        }
      })
      .catch(() => {
        openToast("error", "Erreur réseau");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Se Connecter</h2>
        <p className="login-subtitle">
          Bienvenue ! Connectez-vous à votre compte
        </p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Champ email */}
          <div className="form-group">
            <FaEnvelope className="input-icon" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              autoComplete="username"
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Champ mot de passe */}
          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              autoComplete="current-password"
              required
            />
            <label htmlFor="password">Mot de passe</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form-options">
            <label className="remember">
              <input type="checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <a href="#" className="forgot-link">
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? <CircularProgress/> : "Se connecter"}
          </button>

          <div className="social-login">
            <p className="divider">ou continuer avec</p>
            <button type="button" className="btn-google">
              <FaGoogle className="google-icon" />
              Se connecter avec Google
            </button>
          </div>

          <p className="register-text">
            Pas encore de compte ? <a href="/register">Inscrivez-vous</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

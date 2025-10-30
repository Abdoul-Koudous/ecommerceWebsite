import React, { useState } from "react";
import "./login.scss";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">Bienvenue ! Connectez-vous à votre compte</p>

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

          <button type="submit" className="btn-login">
            Se connecter
          </button>

          <div className="social-login">
            <p className="divider">ou continuer avec un compte social</p>
            <button className="btn-google">
              <FaGoogle className="google-icon" />
              Se connecter avec Google
            </button>
          </div>

          <p className="register-text">
            Pas encore de compte ? <a href="#">Inscrivez-vous</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

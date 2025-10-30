import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./register.scss"; // le style ci-dessous

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Créer un compte</h2>
        <p className="register-subtitle">Inscrivez-vous pour commencer</p>

        <form className="register-form">
          {/* Nom complet */}
          <div className="form-group">
            <FaUser className="input-icon" />
            <input type="text" id="name" placeholder=" " required />
            <label htmlFor="name">Nom complet</label>
          </div>

          {/* Email */}
          <div className="form-group">
            <FaEnvelope className="input-icon" />
            <input type="email" id="email" placeholder=" " required />
            <label htmlFor="email">Adresse e-mail</label>
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder=" "
              required
            />
            <label htmlFor="password">Mot de passe</label>
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Bouton d'inscription */}
          <button type="submit" className="btn-register">
            S'inscrire
          </button>
        </form>

        {/* Connexion avec Google */}
        <div className="social-register">
          <p className="divider">ou continuer avec un compte social</p>
          <button className="btn-google">
            <FcGoogle className="google-icon" />
            Se connecter avec Google
          </button>
        </div>

        {/* Lien vers la connexion */}
        <p className="login-text">
          Vous avez déjà un compte ?{" "}
          <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

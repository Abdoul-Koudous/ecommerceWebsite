import React, { useState } from "react";
import { FaLock, FaKey, FaCheckCircle, FaEye, FaEyeSlash, FaTimesCircle } from "react-icons/fa";
import "./resetpassword.scss";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("❌ Les mots de passe ne correspondent pas !");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Ici ton succès
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="reset-page">
      {showSuccess && (
        <div className="popup-success">
          <FaCheckCircle className="popup-icon" />
          <span>Mot de passe réinitialisé avec succès !</span>
        </div>
      )}

      {showError && (
        <div className="popup-error">
          <FaTimesCircle className="popup-icon" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="reset-card">
        <div className="reset-header">
          <FaKey className="reset-icon" />
          <h2 className="reset-title">Réinitialiser le mot de passe</h2>
          <p className="reset-subtitle">
            Entrez et confirmez votre nouveau mot de passe.
          </p>
        </div>

        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder=" "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label>Nouveau mot de passe</label>
            <span
              className="toggle-password"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirmer le mot de passe</label>
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn-reset">
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

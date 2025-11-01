import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./verify.scss";

const Verify = ({ email = "exemple@email.com" }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPopup, setShowPopup] = useState(true);

  // Masquer le popup après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Passe automatiquement au champ suivant
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    console.log("Code OTP saisi :", code);
    // Ici tu ajouteras la logique d’envoi vers ton backend
  };

  return (
    <div className="verify-container">
      {/* ✅ Popup de confirmation OTP envoyé */}
      {showPopup && (
        <div className="otp-popup">
          <FaCheckCircle className="icon" />
          <span>Code OTP envoyé avec succès </span>
        </div>
      )}

      <div className="verify-box">
        <h2>Vérification OTP</h2>
        <p>
          Veuillez entrer le code à 6 chiffres envoyé à votre adresse e-mail{" "}
          <span className="user-email">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>

          <button type="submit" className="verify-btn">
            Vérifier
          </button>
        </form>

        <p className="resend-text">
          Vous n’avez pas reçu de code ? <a href="#">Renvoyer le code</a>
        </p>
      </div>
    </div>
  );
};

export default Verify;

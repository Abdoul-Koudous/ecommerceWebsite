import React, { useState, useContext } from "react";
import { postData } from "../utils/api";
import "./verify.scss";
import { ToastContext } from "../../context/ToastContext";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { useNavigate } from "react-router";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const { openToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // 📌 Saisie OTP
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // 📌 Envoi OTP au backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const code = otp.join("");

    postData("/api/users/verifyEmail", {
      email: localStorage.getItem("userEmail"),
      otp: code
    })
      .then((res) => {
        if (res?.error === false) {
          openToast("success", res?.message);
          localStorage.removeItem("userEmail");

          // ⏳ délai léger avant redirection
          setTimeout(() => {
            navigate("/login");
          }, 800);

        } else {
          openToast("error", res?.message || "Code OTP incorrect");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="verify-container">

      <div className="verify-box">
        <h2>Vérification OTP</h2>

        <p>
          Entrez le code envoyé à :
          <span className="user-email">{localStorage.getItem("userEmail")}</span>
        </p>

        <form className="otp-form" onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                disabled={loading}
              />
            ))}
          </div>

          <button type="submit" className="verify-btn" disabled={loading}>
            {loading ? <CircularProgress /> : "Vérifier"}
          </button>
        </form>

        <p className="resend-text">
          Pas reçu ? <a href="#">Renvoyer le code</a>
        </p>
      </div>
    </div>
  );
};

export default Verify;

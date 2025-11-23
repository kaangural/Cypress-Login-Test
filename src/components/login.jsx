// src/components/Login.jsx
import { useState, useEffect } from "react";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  // basit email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // “güçlü” şifre örneği: en az 8 karakter, 1 büyük, 1 küçük, 1 sayı
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  useEffect(() => {
    // email validasyonu
    if (!email) {
      setEmailError("");
    } else if (!emailRegex.test(email)) {
      setEmailError("Lütfen geçerli bir email girin.");
    } else {
      setEmailError("");
    }

    // password validasyonu
    if (!password) {
      setPasswordError("");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Şifre en az 8 karakter, 1 büyük harf ve 1 sayı içermelidir."
      );
    } else {
      setPasswordError("");
    }

    // buton aktif mi?
    const valid =
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      accepted &&
      !emailError &&
      !passwordError;

    setCanSubmit(valid);
  }, [email, password, accepted]); // eslint uyarısı gelirse emailError/passwordError da ekleyebilirsin

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSuccess?.(); // App.jsx’te Success sayfasına geçmek için kullanacağız
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-cy="form-email"
      />
      {emailError && <p data-cy="error-email">{emailError}</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-cy="form-password"
      />
      {passwordError && <p data-cy="error-password">{passwordError}</p>}

      <label style={{ display: "block", marginTop: "8px" }}>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          data-cy="form-terms"
        />{" "}
        Şartları kabul ediyorum
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        data-cy="form-submit"
        style={{ marginTop: "12px" }}
      >
        Giriş
      </button>
    </form>
  );
}

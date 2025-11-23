import { useState, useEffect } from "react";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

  const canSubmit =
    emailRegex.test(email) &&
    passwordRegex.test(password) &&
    accepted;

  useEffect(() => {
    if (email && !emailRegex.test(email)) {
      setEmailError("Lütfen geçerli bir email girin.");
    } else {
      setEmailError("");
    }

    if (password && !passwordRegex.test(password)) {
      setPasswordError("Şifre en az 8 karakter, 1 büyük harf ve 1 sayı içermelidir.");
    } else {
      setPasswordError("");
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <label htmlFor="email">Email</label>
      <input
        data-cy="form-email"
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {emailError && <p data-cy="error-email">{emailError}</p>}

      <label htmlFor="password">Password</label>
      <input
        data-cy="form-password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {passwordError && <p data-cy="error-password">{passwordError}</p>}

      <label>
        <input
          data-cy="form-terms"
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />{" "}
        Şartları kabul ediyorum
      </label>

      <button data-cy="form-submit" type="submit" disabled={!canSubmit}>
        Giriş
      </button>
    </form>
  );
}

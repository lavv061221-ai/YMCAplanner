
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn } from "lucide-react";

export default function Signin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email.trim(), password);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="form-container">
      <div className="form-heading">
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign In</h2>
        <p>Log in to continue planning your university life.</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <button
          type="submit"
          className="primary-button submit-button"
          disabled={loading}
        >
          <LogIn size={18} />
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

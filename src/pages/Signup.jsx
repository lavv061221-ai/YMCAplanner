
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus } from "lucide-react";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await signUp(
      email.trim(),
      password,
      fullName.trim()
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      navigate("/");
    } else {
      setMessage(
        "Account created! Please check your email to verify your account before signing in."
      );
    }
  };

  return (
    <div className="form-container">
      <div className="form-heading">
        <span className="eyebrow">JOIN YMCA PLANNER</span>
        <h2>Create Your Account</h2>
        <p>Start organizing your university life.</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          required
        />

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
          placeholder="Create a password"
          minLength={6}
          required
        />

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {message && (
          <p style={{ color: "green" }}>{message}</p>
        )}

        <button
          type="submit"
          className="primary-button submit-button"
          disabled={loading}
        >
          <UserPlus size={18} />
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

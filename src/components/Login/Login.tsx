import { useState, memo, useCallback } from "react";
import { User, Mail, Lock } from "lucide-react";
import BrandLogo from "../../assets/logo.png";
import "./Login.scss";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../lib/api";
import { useAuth } from "../../context/auth-context";

interface FormValues {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();

  // Where the guard bounced them from, so login returns them there.
  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ??
    "/home";

  const handleChange = useCallback(
    (e: { target: { name: string; value: string } }) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (isSignUp && formData.password !== formData.confirmPassword) {
        setPopupMessage("Passwords do not match");
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/${isSignUp ? "signup" : "login"}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        // Signup returns no token, so only a login actually starts a session.
        if (data.token && formData.email) {
          login(data.token, {
            email: formData.email,
            name: formData.name || formData.email.split("@")[0],
          });
        }

        setPopupMessage(
          isSignUp ? "Sign Up Successful! Please log in." : "Login Successful!"
        );
        setPopupVisible(true);

        setTimeout(() => {
          setPopupVisible(false);
          if (isSignUp) {
            setIsSignUp(false);
          } else {
            navigate(from, { replace: true });
          }
        }, 1500);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        setPopupMessage(errorMessage);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      }
    },
    [formData, isSignUp, navigate, login, from]
  );

  const toggleForm = useCallback(() => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  }, []);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <Link to="/home">
          <img src={BrandLogo} alt="A2ZMandi Logo" className="auth-logo" />
        </Link>
        <h2 className="auth-title">{isSignUp ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="auth-input-group">
              <label htmlFor="name" className="auth-label">
                Name
              </label>
              <div className="auth-input-container">
                <User className="auth-icon" aria-hidden="true" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="auth-input"
                  placeholder="Your Name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="auth-input-group">
            <label htmlFor="email" className="auth-label">
              Email address
            </label>
            <div className="auth-input-container">
              <Mail className="auth-icon" aria-hidden="true" />
              <input
                type="email"
                name="email"
                id="email"
                className="auth-input"
                placeholder="you@example.com"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="auth-input-group">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <div className="auth-input-container">
              <Lock className="auth-icon" aria-hidden="true" />
              <input
                type="password"
                name="password"
                id="password"
                className="auth-input"
                placeholder="Your Password"
                value={formData.password || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {isSignUp && (
            <div className="auth-input-group">
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <div className="auth-input-container">
                <Lock className="auth-icon" aria-hidden="true" />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="auth-input"
                  placeholder="Confirm Your Password"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="auth-button-group">
            <button type="submit" className="auth-button">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
        <div className="auth-toggle">
          <button
            type="button"
            className="auth-toggle-button"
            onClick={toggleForm}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
      {popupVisible && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
}

export default memo(LoginPage);
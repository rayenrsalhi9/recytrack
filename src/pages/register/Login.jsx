/* eslint-disable react-refresh/only-export-components */
import { Eye, EyeOff, Recycle } from "lucide-react";
import { useState } from "react";
import { Link, Form, useActionData, useNavigation, useNavigate } from "react-router-dom";
import { login } from '../../firebase/auth/login'
import { loginWithGoogle } from "../../firebase/auth/google";

import img1 from '../../assets/login/plastic_1.png';
import img2 from '../../assets/login/plastic_2.png';
import img3 from '../../assets/login/plastic_3.png';
import img4 from '../../assets/login/plastic_4.png';
import "./register.css";

export const action = async ({ request }) => {
  return await login(request);
};

const Login = () => {

  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle(navigate);
  };

  return (
    <div className="login-container">
      <div className="login-content">
          <h1 className="login-title">Sign in</h1>
          <button className="google-button" onClick={handleGoogleLogin}>
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 0, 0)">
                    <path
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"
                      fill="#4285F4"
                    ></path>
                  </g>
                </svg>
                <span>Continue with Google</span>
          </button>
          <div className="divider">
            <span>or</span>
          </div>
        <Form className="login-form-container" method="post" replace>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className={`form-input ${actionData?.errors?.email ? 'error' : ''}`}
              placeholder="e.g. user@example.com" 
            />
            {actionData?.errors?.email && (
              <span className="error-message">{actionData.errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                name="password"
                className={`form-input ${actionData?.errors?.password ? 'error' : ''}`}
                placeholder="******" 
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {actionData?.errors?.password && (
              <span className="error-message">{actionData.errors.password}</span>
            )}
          </div>

          {actionData && actionData.success === false && !actionData.errors && (
            <div className="general-error-message">
              {actionData.message}
            </div>
          )}

          <button 
            type="submit" 
            className="sign-in-button"
            disabled={navigation.state === "submitting"}
          >
            {navigation.state === "submitting" ? "Signing in..." : "Sign in"}
          </button>

          <p className="signup-prompt">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>

          <div className="logo-container">
            <div className="logo">
              <Recycle size={24} />
              <Link to="..">
                <span>RecyTrack</span>
              </Link>
            </div>
            <p className="copyright">© {new Date().getFullYear()} RecyTrack, Inc.</p>
          </div>
        </Form>
      </div>

      {/* Image Carousel */}
      <div className="image-carousel-container">
        <div className="image-carousel">
          <div className="carousel-track">
            {/* First set of images */}
            <div className="carousel-item large">
              <img src={img1} alt="Recycling infographic" className="carousel-image" />
            </div>
            <div className="carousel-item">
              <img src={img2} alt="Eco rewards poster" className="carousel-image" />
            </div>
            <div className="carousel-item">
              <img src={img3} alt="Plastic bottle collection" className="carousel-image" />
            </div>
            <div className="carousel-item tall">
              <img src={img4} alt="Recycling statistics" className="carousel-image" />
            </div>
            <div className="carousel-item">
              <img src={img1} alt="Eco tips" className="carousel-image" />
            </div>
            <div className="carousel-item wide">
              <img src={img3} alt="Reward points chart" className="carousel-image" />
            </div>

            {/* Duplicate set for seamless looping */}
            <div className="carousel-item large">
              <img src={img1} alt="Recycling infographic" className="carousel-image" />
            </div>
            <div className="carousel-item">
              <img src={img4} alt="Eco rewards poster" className="carousel-image" />
            </div>
            <div className="carousel-item">
              <img src={img2} alt="Plastic bottle collection" className="carousel-image" />
            </div>
            <div className="carousel-item tall">
              <img src={img2} alt="Recycling statistics" className="carousel-image" />
            </div>
            <div className="carousel-item">
              <img src={img1} alt="Eco tips" className="carousel-image" />
            </div>
            <div className="carousel-item wide">
              <img src={img3} alt="Reward points chart" className="carousel-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
/* eslint-disable react-refresh/only-export-components */
import { Eye, EyeOff, Recycle } from "lucide-react";
import { useState } from "react";
import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import { createAccount } from "../../firebase/auth/signup";

import img1 from '../../assets/login/plastic_1.png'
import img2 from '../../assets/login/plastic_2.png'
import img3 from '../../assets/login/plastic_3.png'
import img4 from '../../assets/login/plastic_4.png'
import "./register.css";

export const action = async ({ request }) => {
  return await createAccount(request);
}

const SignupPage = () => {

  const actionData = useActionData();
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <Form className="login-form-container" method="post" replace>
          <h1 className="login-title">Sign up</h1>

          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className={`form-input ${actionData?.errors?.username ? 'error' : ''}`}
              placeholder="e.g. EcoHero123" 
            />
            {actionData?.errors?.username && (
              <span className="error-message">{actionData.errors.username}</span>
            )}
          </div>

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
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              className={`form-input ${actionData?.errors?.phone ? 'error' : ''}`}
              placeholder="e.g. +216 12 345 678" 
            />
            {actionData?.errors?.phone && (
              <span className="error-message">{actionData.errors.phone}</span>
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

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-input-container">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                id="confirm-password"
                name="confirm-password"
                className={`form-input ${actionData?.errors?.confirmPassword ? 'error' : ''}`}
                placeholder="******" 
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {actionData?.errors?.confirmPassword && (
              <span className="error-message">{actionData.errors.confirmPassword}</span>
            )}
          </div>

          {/* General Firebase/Auth error displayed separately */}
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
            {
              navigation.state === "submitting"? "Signing up..." : "Sign up"
            }
          </button>

          <p className="signup-prompt">
            Already have an account? <Link to="/login">Log in</Link>
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

export default SignupPage;

import { Eye, EyeOff, Recycle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css"; // Assuming you want to use the same styles
import img1 from '../../assets/login/plastic_1.png'
import img2 from '../../assets/login/plastic_2.png'
import img3 from '../../assets/login/plastic_3.png'
import img4 from '../../assets/login/plastic_4.png'

const SignupPage = () => {
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
        <div className="login-form-container">
          <h1 className="login-title">Sign up</h1>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="form-input" placeholder="e.g. EcoHero123" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-input" placeholder="e.g. user@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" className="form-input" placeholder="e.g. +216 12 345 678" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input type={showPassword ? "text" : "password"} id="password" className="form-input" placeholder="******" />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="password-input-container">
              <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" className="form-input" placeholder="******" />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="sign-in-button">
            Sign up
          </button>

          <p className="signup-prompt">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <div className="logo-container">
            <div className="logo">
              <Recycle size={24} />
              <Link to='..'>
                <span>RecyTrack</span>
              </Link>
            </div>
            <p className="copyright">© {new Date().getFullYear()} RecyTrack, Inc.</p>
          </div>
        </div>
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

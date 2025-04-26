import { Recycle, PackageOpen, Coins, Flame, ArrowDown } from "lucide-react"
import { Link } from "react-router-dom"
import "./hero.css"

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="floating-icon left-top">
        <div className="icon-circle">
          <PackageOpen className="icon" />
          <div className="icon-label">Gather Plastics</div>
        </div>
      </div>

      <div className="floating-icon right-top">
        <div className="icon-circle">
          <Coins className="icon" />
          <div className="icon-label">Earn Rewards</div>
        </div>
      </div>

      <div className="floating-icon left-bottom">
        <div className="icon-circle">
          <Recycle className="icon" />
          <div className="icon-label">Recycle Now</div>
        </div>
      </div>

      <div className="hero-content">
        <div className="badge">
            <Flame />
            Recycling Just Got Rewarded!
        </div>

        <h1 className="hero-title">Turn your plastic waste into <span className="highlight">rewards</span></h1>

        <p className="hero-description">
        Transform your plastic waste into real value with our app. Earn points every time you recycle, track your impact, and redeem exciting rewards. Join a community dedicated to making cities cleaner and building a greener future.
        </p>

        <div className="cta-buttons">
          <Link to="login">
            <button className="cta-button primary">Log In</button>
          </Link>
          <Link to="signup">
            <button className="cta-button secondary">Create Account</button>
          </Link>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-text">Scroll to learn more</div>
        <ArrowDown size={24} className="scroll-icon" />
      </div>
    </div>
  )
}

export default HeroSection
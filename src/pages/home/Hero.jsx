import { Recycle, PackageOpen, Coins, Flame, ArrowDown } from "lucide-react"
import { Link } from "react-router-dom"
import "./hero.css"
import { useTranslation, Trans } from "react-i18next"

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <div className="hero-container">
      <div className="floating-icon left-top">
        <div className="icon-circle">
          <PackageOpen className="icon" />
          <div className="icon-label">{t("hero.gatherPlastics")}</div>
        </div>
      </div>

      <div className="floating-icon right-top">
        <div className="icon-circle">
          <Coins className="icon" />
          <div className="icon-label">{t("hero.earnRewards")}</div>
        </div>
      </div>

      <div className="floating-icon left-bottom">
        <div className="icon-circle">
          <Recycle className="icon" />
          <div className="icon-label">{t("hero.recycleNow")}</div>
        </div>
      </div>

      <div className="hero-content">
        <div className="badge">
            <Flame />
            {t("hero.badgeText")}
        </div>

        <h1 className="hero-title">
          <Trans i18nKey="hero.title" components={{ 1: <span className="highlight" /> }} />
        </h1>

        <p className="hero-description">
          {t("hero.description")}
        </p>

        <div className="cta-buttons">
          <Link to="login">
            <button className="cta-button primary">{t("hero.login")}</button>
          </Link>
          <Link to="signup">
            <button className="cta-button secondary">{t("hero.createAccount")}</button>
          </Link>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-text">{t("hero.scrollText")}</div>
        <ArrowDown size={24} className="scroll-icon" />
      </div>
    </div>
  )
}

export default HeroSection
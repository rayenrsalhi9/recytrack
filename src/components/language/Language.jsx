import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import "./language.css";

const Language = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "en");
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "en" },
    { code: "fr", name: "Français", flag: "fr" },
    { code: "ar", name: "العربية", flag: "ar" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
    setIsOpen(false);

    // Save selected language to localStorage (optional but recommended)
    localStorage.setItem("appLanguage", langCode);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // On mount: Load language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Get the currently selected language object
  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage);

  return (
    <div className="language-selector-container" ref={dropdownRef}>
      {isOpen && (
        <div className="language-dropdown">
          <div className="language-dropdown-header">Select Language</div>
          <div className="language-options">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${selectedLanguage === language.code ? "selected" : ""}`}
                onClick={() => selectLanguage(language.code)}
              >
                <span className="language-flag">{language.flag}</span>
                <span className="language-name">{language.name}</span>
                {selectedLanguage === language.code && <Check size={16} className="language-check" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <button className="language-toggle" onClick={toggleDropdown} aria-label="Change language" title="Change language">
        <div className="language-toggle-content">
          <Globe size={20} />
          <span className="language-toggle-text">{currentLanguage?.flag}</span>
        </div>
      </button>
    </div>
  );
};

export default Language;
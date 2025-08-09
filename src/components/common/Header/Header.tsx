import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import SearchIcon from "/assets/icons/search-icon.svg";
import ProfileImg from "/assets/images/avatar.png";
import navarrow from "/assets/icons/nav-arrow.png";
import navbell from "/assets/icons/navbell.png";
import "./Header.scss";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <button className="header__menu-btn" onClick={onMenuClick}>
            <span className="header__hamburger"></span>
            <span className="header__hamburger"></span>
            <span className="header__hamburger"></span>
          </button>
        </div>

        <div className="header__center">
          <form className="header__search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={handleSearchChange}
              className="header__search-input"
            />
            <button type="submit" className="header__search-btn">
              <img
                src={SearchIcon}
                alt="Search"
                className="header__search-icon"
              />
            </button>
          </form>
        </div>

        <div className="header__right">
          <Link to="/docs" className="header__docs">
            Docs
          </Link>

          <button className="header__notification">
            <span className="header__notification-icon">
              <img src={navbell} alt="nav bell icon" />
            </span>
            <span className="header__notification-badge"></span>
          </button>

          <div className="header__user">
            <div className="header__user-info">
              <img
                src={ProfileImg}
                alt="User Avatar"
                className="header__user-avatar"
              />
              <button
                className="header__user-details"
                onClick={toggleUserDropdown}
              >
                <span className="header__user-name">
                  {user?.name || "Adedeji"}
                </span>
                <span className="header__user-arrow">
                  <img src={navarrow} alt="navarrow" />
                </span>
              </button>
            </div>

            {isUserDropdownOpen && (
              <div className="header__user-dropdown">
                <div className="header__user-dropdown-item">
                  <span className="header__user-dropdown-icon">👤</span>
                  Profile
                </div>
                <div className="header__user-dropdown-item">
                  <span className="header__user-dropdown-icon">⚙️</span>
                  Settings
                </div>
                <div className="header__user-dropdown-divider"></div>
                <button
                  className="header__user-dropdown-item header__user-dropdown-item--logout"
                  onClick={handleLogout}
                >
                  <span className="header__user-dropdown-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

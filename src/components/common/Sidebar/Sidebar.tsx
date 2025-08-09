import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/icons/logo.svg";
import UserIcon from "../../../assets/icons/usericon.png";
import GuarantorIcon from "../../../assets/icons/guarantor.png";
import briefcase from "../../../assets/icons/briefcase.svg";
import arrow from "../../../assets/icons/uparrow.png";
import dashhome from "../../../assets/icons/dashhome.png";
import Loans from "../../../assets/icons/loans.png";
import "./Sidebar.scss";
import Decision from "../../../assets/icons/decision.png";
import Savings from "../../../assets/icons/saving.png";
import LoanRequest from "../../../assets/icons/loan.png";
import WhiteList from "../../../assets/icons/whitelist.png";
import Karma from "../../../assets/icons/karma.png";
import Organization from "../../../assets/icons/organization.png";
import LoanProducts from "../../../assets/icons/loan-products.png";
import UserFriendsIcon from "../../../assets/icons/user-friends.svg"; // <-- renamed import
import FeesCharge from "../../../assets/icons/fees.png";
import Transactions from "../../../assets/icons/transaction.png";
import Services from "../../../assets/icons/services.png";
import ServiceAccount from "../../../assets/icons/service-account.png";
import Settlement from "../../../assets/icons/settlement.png";
import Reports from "../../../assets/icons/reports.png";
import Prefrences from "../../../assets/icons/pref.png";
import Fees from "../../../assets/icons/fees-pricing.png";
import OrgArrow from "../../../assets/icons/org-arrow.png";
import Audit from "../../../assets/icons/audit.png";

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string; // optional now to be defensive
}

const menuSections: MenuSection[] = [
  {
    title: "CUSTOMERS",
    items: [
      { id: "users", label: "Users", path: "/users", icon: UserIcon },
      {
        id: "guarantors",
        label: "Guarantors",
        path: "/guarantors",
        icon: GuarantorIcon,
      },
      { id: "loans", label: "Loans", path: "/loans", icon: Loans },
      {
        id: "decision-models",
        label: "Decision Models",
        path: "/decision-models",
        icon: Decision,
      },
      { id: "savings", label: "Savings", path: "/savings", icon: Savings },
      {
        id: "loan-requests",
        label: "Loan Requests",
        path: "/loan-requests",
        icon: LoanRequest,
      },
      {
        id: "whitelist",
        label: "Whitelist",
        path: "/whitelist",
        icon: WhiteList,
      },
      { id: "karma", label: "Karma", path: "/karma", icon: Karma },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      {
        id: "organization",
        label: "Organization",
        path: "/organization",
        icon: Organization,
      },
      {
        id: "loan-products",
        label: "Loan Products",
        path: "/loan-products",
        icon: LoanProducts,
      },
      {
        id: "savings-products",
        label: "Savings Products",
        path: "/savings-products",
        icon: UserFriendsIcon,
      },
      {
        id: "fees-charges",
        label: "Fees and Charges",
        path: "/fees-charges",
        icon: FeesCharge,
      },
      {
        id: "transactions",
        label: "Transactions",
        path: "/transactions",
        icon: Transactions,
      },
      { id: "services", label: "Services", path: "/services", icon: Services },
      {
        id: "service-account",
        label: "Service Account",
        path: "/service-account",
        icon: ServiceAccount,
      },
      {
        id: "settlements",
        label: "Settlements",
        path: "/settlements",
        icon: Settlement,
      },
      { id: "reports", label: "Reports", path: "/reports", icon: Reports },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        id: "preferences",
        label: "Preferences",
        path: "/preferences",
        icon: Prefrences,
      },
      {
        id: "fees-pricing",
        label: "Fees and Pricing",
        path: "/fees-pricing",
        icon: Fees,
      },
      {
        id: "audit-logs",
        label: "Audit Logs",
        path: "/audit-logs",
        icon: UserFriendsIcon,
      },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleOrgDropdown = () => {
    setIsOrgDropdownOpen(!isOrgDropdownOpen);
  };

  const isActiveRoute = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar__header">
        <div className="sidebar__header-content">
          <Link to="/dashboard" className="sidebar__logo">
            <img src={Logo} alt="Lendsqr" />
          </Link>
          <button className="sidebar__close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sidebar__org-selector">
          <button
            className={`sidebar__org-btn ${
              isOrgDropdownOpen ? "sidebar__org-btn--open" : ""
            }`}
            onClick={toggleOrgDropdown}
          >
            <span className="sidebar__org-icon">
              <img src={briefcase} alt="briefcase" />
            </span>
            <span className="sidebar__org-text">Switch Organization</span>
            <span className="sidebar__org-arrow">
              <img src={OrgArrow} alt="arrow" />
            </span>
          </button>

          {isOrgDropdownOpen && (
            <div className="sidebar__org-dropdown">
              <div className="sidebar__org-option">Lendsqr</div>
              <div className="sidebar__org-option">Irorun</div>
              <div className="sidebar__org-option">Lendstar</div>
            </div>
          )}
        </div>
      </div>

      <nav className="sidebar__nav">
        <Link
          to="/dashboard"
          className={`sidebar__nav-item sidebar__nav-item--single ${
            isActiveRoute("/dashboard") ? "sidebar__nav-item--active" : ""
          }`}
          onClick={onClose}
        >
          <img src={dashhome} alt="dashboard" className="sidebar__nav-icon" />
          <span className="sidebar__nav-text">Dashboard</span>
        </Link>

        {menuSections.map((section) => (
          <div key={section.title} className="sidebar__section">
            <h3 className="sidebar__section-title">{section.title}</h3>
            <ul className="sidebar__section-list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`sidebar__nav-item ${
                      isActiveRoute(item.path)
                        ? "sidebar__nav-item--active"
                        : ""
                    }`}
                    onClick={onClose}
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="sidebar__nav-icon"
                      />
                    )}
                    <span className="sidebar__nav-text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__version">v1.2.0</div>
        <Link to="/login" className="sidebar__logout" onClick={onClose}>
          <img
            src={UserFriendsIcon}
            alt="logout"
            className="sidebar__logout-icon"
          />
          <span className="sidebar__logout-text">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

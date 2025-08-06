import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../assets/icons/logo.svg';
import UserFriendsIcon from '../../../assets/icons/user-friends.svg';
import './Sidebar.scss';

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const menuSections: MenuSection[] = [
  {
    title: 'CUSTOMERS',
    items: [
      { id: 'users', label: 'Users', path: '/users', icon: UserFriendsIcon },
      { id: 'guarantors', label: 'Guarantors', path: '/guarantors', icon: UserFriendsIcon },
      { id: 'loans', label: 'Loans', path: '/loans', icon: UserFriendsIcon },
      { id: 'decision-models', label: 'Decision Models', path: '/decision-models', icon: UserFriendsIcon },
      { id: 'savings', label: 'Savings', path: '/savings', icon: UserFriendsIcon },
      { id: 'loan-requests', label: 'Loan Requests', path: '/loan-requests', icon: UserFriendsIcon },
      { id: 'whitelist', label: 'Whitelist', path: '/whitelist', icon: UserFriendsIcon },
      { id: 'karma', label: 'Karma', path: '/karma', icon: UserFriendsIcon },
    ],
  },
  {
    title: 'BUSINESSES',
    items: [
      { id: 'organization', label: 'Organization', path: '/organization', icon: UserFriendsIcon },
      { id: 'loan-products', label: 'Loan Products', path: '/loan-products', icon: UserFriendsIcon },
      { id: 'savings-products', label: 'Savings Products', path: '/savings-products', icon: UserFriendsIcon },
      { id: 'fees-charges', label: 'Fees and Charges', path: '/fees-charges', icon: UserFriendsIcon },
      { id: 'transactions', label: 'Transactions', path: '/transactions', icon: UserFriendsIcon },
      { id: 'services', label: 'Services', path: '/services', icon: UserFriendsIcon },
      { id: 'service-account', label: 'Service Account', path: '/service-account', icon: UserFriendsIcon },
      { id: 'settlements', label: 'Settlements', path: '/settlements', icon: UserFriendsIcon },
      { id: 'reports', label: 'Reports', path: '/reports', icon: UserFriendsIcon },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { id: 'preferences', label: 'Preferences', path: '/preferences', icon: UserFriendsIcon },
      { id: 'fees-pricing', label: 'Fees and Pricing', path: '/fees-pricing', icon: UserFriendsIcon },
      { id: 'audit-logs', label: 'Audit Logs', path: '/audit-logs', icon: UserFriendsIcon },
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
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
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
            className={`sidebar__org-btn ${isOrgDropdownOpen ? 'sidebar__org-btn--open' : ''}`}
            onClick={toggleOrgDropdown}
          >
            <span className="sidebar__org-icon">💼</span>
            <span className="sidebar__org-text">Switch Organization</span>
            <span className="sidebar__org-arrow">⌄</span>
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
          className={`sidebar__nav-item sidebar__nav-item--single ${isActiveRoute('/dashboard') ? 'sidebar__nav-item--active' : ''}`}
          onClick={onClose}
        >
          <img src={UserFriendsIcon} alt="" className="sidebar__nav-icon" />
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
                    className={`sidebar__nav-item ${isActiveRoute(item.path) ? 'sidebar__nav-item--active' : ''}`}
                    onClick={onClose}
                  >
                    <img src={item.icon} alt="" className="sidebar__nav-icon" />
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
          <img src={UserFriendsIcon} alt="" className="sidebar__logout-icon" />
          <span className="sidebar__logout-text">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
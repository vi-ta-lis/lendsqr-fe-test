import React, { type ReactNode, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Header onMenuClick={toggleSidebar} />
      <main className="layout__main">
        <div className="layout__content">
          {children}
        </div>
      </main>
      {isSidebarOpen && <div className="layout__overlay" onClick={closeSidebar} />}
    </div>
  );
};

export default Layout;
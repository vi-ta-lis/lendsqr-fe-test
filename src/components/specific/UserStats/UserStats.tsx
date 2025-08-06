import React from 'react';
import type { UserStats as UserStatsType } from '../../../types';
import UsersIcon from '../../../assets/icons/np-users-dash.svg';
import UsersIcon2 from '../../../assets/icons/user-group.svg';
import './UserStats.scss';

interface UserStatsProps {
  stats: UserStatsType;
  loading?: boolean;
}

interface StatCard {
  id: string;
  title: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

const UserStats: React.FC<UserStatsProps> = ({ stats, loading = false }) => {
  const statCards: StatCard[] = [
    {
      id: 'total-users',
      title: 'USERS',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: '#DF18FF',
      bgColor: 'rgba(223, 24, 255, 0.1)',
    },
    {
      id: 'active-users',
      title: 'ACTIVE USERS',
      value: stats.activeUsers,
      icon: UsersIcon2,
      color: '#5718FF',
      bgColor: 'rgba(87, 24, 255, 0.1)',
    },
    {
      id: 'users-with-loans',
      title: 'USERS WITH LOANS',
      value: stats.usersWithLoans,
      icon: UsersIcon,
      color: '#F55F44',
      bgColor: 'rgba(245, 95, 68, 0.1)',
    },
    {
      id: 'users-with-savings',
      title: 'USERS WITH SAVINGS',
      value: stats.usersWithSavings,
      icon: UsersIcon,
      color: '#FF3366',
      bgColor: 'rgba(255, 51, 102, 0.1)',
    },
  ];

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="user-stats">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="user-stats__card user-stats__card--loading">
            <div className="user-stats__card-skeleton"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="user-stats">
      {statCards.map((card) => (
        <div key={card.id} className="user-stats__card">
          <div className="user-stats__card-content">
            <div 
              className="user-stats__card-icon"
              style={{ 
                backgroundColor: card.bgColor
              }}
            >
              {typeof card.icon === 'string' && card.icon.startsWith('http') ? (
                <span>{card.icon}</span>
              ) : (
                <img src={card.icon} alt="" className="user-stats__card-icon-img" />
              )}
            </div>
            
            <div className="user-stats__card-info">
              <h3 className="user-stats__card-title">{card.title}</h3>
              <p className="user-stats__card-value">
                {formatNumber(card.value)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
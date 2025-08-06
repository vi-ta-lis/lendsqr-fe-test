import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Button from '../../components/common/Button';
import { getUserById } from '../../services/mockData';
import type { User, UserStatus } from '../../types';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const userData = getUserById(userId);
      setUser(userData || null);
      setLoading(false);
    }
  }, [userId]);

  const handleStatusChange = async (newStatus: UserStatus) => {
    if (user) {
      // In a real app, this would make an API call
      setUser({ ...user, status: newStatus });
      // Show success message or handle API response
    }
  };

  const handleGoBack = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <Layout>
        <div className="user-details__loading">
          <div className="user-details__loading-spinner"></div>
          <p>Loading user details...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="user-details__not-found">
          <h1>User Not Found</h1>
          <p>The user you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={handleGoBack}>
            Back to Users
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="user-details">
        <div className="user-details__header">
          <button 
            className="user-details__back-btn" 
            onClick={handleGoBack}
          >
            ← Back to Users
          </button>
          
          <div className="user-details__title-section">
            <h1 className="user-details__title">User Details</h1>
            <div className="user-details__actions">
              <Button 
                variant="outline" 
                onClick={() => handleStatusChange('Blacklisted')}
                className="user-details__blacklist-btn"
              >
                BLACKLIST USER
              </Button>
              <Button 
                variant="primary" 
                onClick={() => handleStatusChange('Active')}
                className="user-details__activate-btn"
              >
                ACTIVATE USER
              </Button>
            </div>
          </div>
        </div>

        <div className="user-details__user-card">
          <div className="user-details__user-info">
            <div className="user-details__avatar">
              <span className="user-details__avatar-text">
                {user.personalInformation.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="user-details__user-meta">
              <h2 className="user-details__user-name">{user.personalInformation.fullName}</h2>
              <p className="user-details__user-id">LSQFf587g90</p>
            </div>
          </div>
          
          <div className="user-details__user-tier">
            <p className="user-details__tier-label">User's Tier</p>
            <div className="user-details__tier-stars">
              ⭐⭐⭐
            </div>
          </div>
          
          <div className="user-details__user-balance">
            <p className="user-details__balance-amount">₦200,000.00</p>
            <p className="user-details__balance-bank">9912345678/Providus Bank</p>
          </div>
        </div>

        <div className="user-details__nav">
          <div className="user-details__nav-items">
            {['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'].map((item, index) => (
              <button 
                key={item}
                className={`user-details__nav-item ${index === 0 ? 'user-details__nav-item--active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="user-details__content">
          <div className="user-details__section">
            <h3 className="user-details__section-title">Personal Information</h3>
            <div className="user-details__section-grid">
              <div className="user-details__field">
                <span className="user-details__field-label">Full Name</span>
                <span className="user-details__field-value">{user.personalInformation.fullName}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Phone Number</span>
                <span className="user-details__field-value">{user.personalInformation.phoneNumber}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Email Address</span>
                <span className="user-details__field-value">{user.personalInformation.emailAddress}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">BVN</span>
                <span className="user-details__field-value">{user.personalInformation.bvn}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Gender</span>
                <span className="user-details__field-value">{user.personalInformation.gender}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Marital Status</span>
                <span className="user-details__field-value">{user.personalInformation.maritalStatus}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Children</span>
                <span className="user-details__field-value">{user.personalInformation.children}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Type of Residence</span>
                <span className="user-details__field-value">{user.personalInformation.typeOfResidence}</span>
              </div>
            </div>
          </div>

          <div className="user-details__section">
            <h3 className="user-details__section-title">Education and Employment</h3>
            <div className="user-details__section-grid">
              <div className="user-details__field">
                <span className="user-details__field-label">Level of Education</span>
                <span className="user-details__field-value">{user.educationAndEmployment.levelOfEducation}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Employment Status</span>
                <span className="user-details__field-value">{user.educationAndEmployment.employmentStatus}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Sector of Employment</span>
                <span className="user-details__field-value">{user.educationAndEmployment.sectorOfEmployment}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Duration of Employment</span>
                <span className="user-details__field-value">{user.educationAndEmployment.durationOfEmployment}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Office Email</span>
                <span className="user-details__field-value">{user.educationAndEmployment.officeEmail}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Monthly Income</span>
                <span className="user-details__field-value">{user.educationAndEmployment.monthlyIncome}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Loan Repayment</span>
                <span className="user-details__field-value">₦{user.educationAndEmployment.loanRepayment}</span>
              </div>
            </div>
          </div>

          <div className="user-details__section">
            <h3 className="user-details__section-title">Socials</h3>
            <div className="user-details__section-grid">
              <div className="user-details__field">
                <span className="user-details__field-label">Twitter</span>
                <span className="user-details__field-value">{user.socials.twitter}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Facebook</span>
                <span className="user-details__field-value">{user.socials.facebook}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Instagram</span>
                <span className="user-details__field-value">{user.socials.instagram}</span>
              </div>
            </div>
          </div>

          <div className="user-details__section">
            <h3 className="user-details__section-title">Guarantor</h3>
            <div className="user-details__section-grid">
              <div className="user-details__field">
                <span className="user-details__field-label">Full Name</span>
                <span className="user-details__field-value">{user.guarantor.fullName}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Phone Number</span>
                <span className="user-details__field-value">{user.guarantor.phoneNumber}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Email Address</span>
                <span className="user-details__field-value">{user.guarantor.emailAddress}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Relationship</span>
                <span className="user-details__field-value">{user.guarantor.relationship}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;
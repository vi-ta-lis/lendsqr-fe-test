import React, { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import UserStats from '../../components/specific/UserStats';
import UserTable from '../../components/specific/UserTable';
import Pagination from '../../components/common/Pagination';
import { ApiService } from '../../services/api';
import type { User, UserStats as UserStatsType, PaginationInfo, UserStatus } from '../../types';
import './Users.scss';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStatsType>({
    totalUsers: 0,
    activeUsers: 0,
    usersWithLoans: 0,
    usersWithSavings: 0,
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 100,
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchUsers = async (page: number = 1, limit: number = 100) => {
    try {
      setLoading(true);
      const response = await ApiService.getUsers(page, limit);
      setUsers(response.data);
      setPagination({
        currentPage: response.pagination.page,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.total,
        itemsPerPage: response.pagination.limit,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const userStats = await ApiService.getUserStats();
      setStats(userStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const handlePageChange = (page: number) => {
    fetchUsers(page, pagination.itemsPerPage);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    fetchUsers(1, itemsPerPage);
  };

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      await ApiService.updateUserStatus(userId, newStatus);
      
      // Update the user in the current list
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      
      // Refresh stats after status change
      fetchStats();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <Layout>
      <div className="users-page">
        <div className="users-page__header">
          <h1 className="users-page__title">Users</h1>
        </div>

        <div className="users-page__stats">
          <UserStats stats={stats} loading={statsLoading} />
        </div>

        <div className="users-page__content">
          <UserTable
            users={users}
            loading={loading}
            onStatusChange={handleStatusChange}
          />
          
          {!loading && users.length > 0 && (
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Users;
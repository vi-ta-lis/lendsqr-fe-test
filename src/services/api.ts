import type { User, UserStats, PaginatedResponse, UserTableFilters } from '../types';
import { mockUsers, getUserById, getUsersByFilters, getUserStats } from './mockData';

const API_DELAY = 300;

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class ApiService {
  static async getUsers(
    page: number = 1,
    limit: number = 100,
    filters?: UserTableFilters
  ): Promise<PaginatedResponse<User>> {
    await delay(API_DELAY);
    
    const filteredUsers = filters ? getUsersByFilters(filters) : mockUsers;
    
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const data = filteredUsers.slice(startIndex, endIndex);
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
  
  static async getUserById(id: string): Promise<User | null> {
    await delay(API_DELAY);
    
    const user = getUserById(id);
    return user || null;
  }
  
  static async getUserStats(): Promise<UserStats> {
    await delay(API_DELAY);
    
    return getUserStats();
  }
  
  static async updateUserStatus(userId: string, status: User['status']): Promise<User> {
    await delay(API_DELAY);
    
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers[userIndex].status = status;
    return mockUsers[userIndex];
  }
  
  static async searchUsers(query: string): Promise<User[]> {
    await delay(API_DELAY);
    
    const lowercaseQuery = query.toLowerCase();
    return mockUsers.filter(user => 
      user.userName.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.personalInformation.fullName.toLowerCase().includes(lowercaseQuery) ||
      user.phoneNumber.includes(query)
    );
  }
  
  static getOrganizations(): string[] {
    const orgs = new Set(mockUsers.map(user => user.orgName));
    return Array.from(orgs).sort();
  }
}
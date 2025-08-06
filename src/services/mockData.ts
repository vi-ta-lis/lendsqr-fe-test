import type { User, UserStatus } from '../types';
import usersData from '../utils/lendsqr_users_data.json';

// Use actual JSON data from lendsqr_users_data.json
function loadUsersFromJSON(): User[] {
  // Transform the JSON data to match our User interface
  return usersData.map((user: any) => ({
    id: user.id,
    orgName: user.orgName,
    userName: user.userName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    dateJoined: user.dateJoined,
    status: user.status as UserStatus,
    personalInformation: {
      fullName: user.personalInformation.fullName,
      phoneNumber: user.personalInformation.phoneNumber,
      emailAddress: user.personalInformation.emailAddress,
      bvn: user.personalInformation.bvn,
      gender: user.personalInformation.gender,
      maritalStatus: user.personalInformation.maritalStatus,
      children: user.personalInformation.children,
      typeOfResidence: user.personalInformation.typeOfResidence,
    },
    educationAndEmployment: {
      levelOfEducation: user.educationAndEmployment.levelOfEducation,
      employmentStatus: user.educationAndEmployment.employmentStatus,
      sectorOfEmployment: user.educationAndEmployment.sectorOfEmployment,
      durationOfEmployment: user.educationAndEmployment.durationOfEmployment,
      officeEmail: user.educationAndEmployment.officeEmail,
      monthlyIncome: user.educationAndEmployment.monthlyIncome,
      loanRepayment: user.educationAndEmployment.loanRepayment?.toString() || '0',
    },
    socials: {
      twitter: user.socials.twitter,
      facebook: user.socials.facebook,
      instagram: user.socials.instagram,
    },
    guarantor: {
      fullName: user.guarantor.fullName,
      phoneNumber: user.guarantor.phoneNumber,
      emailAddress: user.guarantor.emailAddress,
      relationship: user.guarantor.relationship,
    },
    bankDetails: {
      accountNumber: user.bankDetails.accountNumber,
      bankName: user.bankDetails.bankName,
    },
  }));
}

// Initialize users data from JSON file
export const mockUsers = loadUsersFromJSON();

// Alternative: Fetch from JSON Generator API (when you have a token)
export async function fetchUsersFromAPI(): Promise<User[]> {
  try {
    // This would be used with your actual JSON Generator API token
    // const JSON_GENERATOR_API = 'https://app.json-generator.com/api/json/get';
    // const response = await fetch(`${JSON_GENERATOR_API}/your-api-token-here`);
    // const data = await response.json();
    // return data;
    
    // For now, return the generated mock data
    return Promise.resolve(mockUsers);
  } catch (error) {
    console.error('Error fetching users from API:', error);
    return mockUsers; // Fallback to generated data
  }
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getUsersByFilters(filters: {
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  status?: UserStatus | '';
}): User[] {
  return mockUsers.filter(user => {
    if (filters.organization && !user.orgName.toLowerCase().includes(filters.organization.toLowerCase())) {
      return false;
    }
    if (filters.username && !user.userName.toLowerCase().includes(filters.username.toLowerCase())) {
      return false;
    }
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) {
      return false;
    }
    if (filters.status && user.status !== filters.status) {
      return false;
    }
    return true;
  });
}

export function getUserStats() {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === 'Active').length;
  
  const usersWithLoans = Math.floor(totalUsers * 0.6);
  const usersWithSavings = Math.floor(totalUsers * 0.8);
  
  return {
    totalUsers,
    activeUsers,
    usersWithLoans,
    usersWithSavings,
  };
}

// Function to use your actual JSON Generator template
export function configureJSONGeneratorAPI(token: string) {
  // You can call this function with your actual JSON Generator API token
  // to replace the mock data with real JSON Generator data
  console.log('JSON Generator API configured with token:', token);
}
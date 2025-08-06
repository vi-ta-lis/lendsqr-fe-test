export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  personalInformation: PersonalInformation;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantor: Guarantor;
  bankDetails: BankDetails;
}

export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface PersonalInformation {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: 'Male' | 'Female';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  children: string;
  typeOfResidence: 'Parent\'s Apartment' | 'Own Apartment' | 'Rented Apartment' | 'Family House';
}

export interface EducationAndEmployment {
  levelOfEducation: 'High School' | 'Bachelor\'s' | 'Master\'s' | 'PhD' | 'Other';
  employmentStatus: 'Employed' | 'Unemployed' | 'Self-employed' | 'Student';
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

export interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

export interface BankDetails {
  accountNumber: string;
  bankName: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export interface UserTableFilters {
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  dateJoined?: string;
  status?: UserStatus;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
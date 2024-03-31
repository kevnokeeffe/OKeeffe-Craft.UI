export interface AccountResponseModel {
  id: string;
  fullName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date | null;
  isVerified: boolean;
}

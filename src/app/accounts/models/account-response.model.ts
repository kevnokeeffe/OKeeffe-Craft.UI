export interface AccountResponseModel {
  id: number;
  fullName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date | null;
  isVerified: boolean;
}

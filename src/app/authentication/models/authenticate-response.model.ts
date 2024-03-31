export interface AuthenticateResponseModel {
  id: string;
  fullName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date | null;
  isVerified: boolean;
  jwtToken: string | null;
  refreshToken: string | null;
}

export interface ResetPasswordRequestModel {
  token: string;
  password: string;
  confirmPassword: string;
}

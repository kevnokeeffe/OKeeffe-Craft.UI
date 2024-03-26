export class AuthUtils {
  static saveRefreshToken(token: string): void {
    localStorage.setItem('token', token);
  }
  static getRefreshToken(): string {
    return localStorage.getItem('token') || '';
  }
  static saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  static getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  static removeUser(): void {
    localStorage.removeItem('user');
  }
  static removeRefreshToken(): void {
    localStorage.removeItem('token');
  }
}

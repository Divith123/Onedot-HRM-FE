import api from './api';
import {
  SignupRequest,
  SigninRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  ExternalAuthRequest,
  AuthResponse,
} from '@/types/api.types';

class AuthService {
  /**
   * Register a new user
   * Sends verification email
   */
  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  }

  /**
   * Verify email with verification code
   * Returns JWT tokens after verification
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/verify-email', data);

    // Save tokens and user data to localStorage
    if (response.data.success && response.data.token) {
      this.saveAuthData(response.data);
    }

    return response.data;
  }

  /**
   * Sign in existing user
   * Requires verified email
   */
  async signin(data: SigninRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signin', data);

    // Save tokens and user data to localStorage
    if (response.data.success && response.data.token) {
      this.saveAuthData(response.data);
    }

    return response.data;
  }

  /**
   * External OAuth login (Google/GitHub)
   * Automatically creates or links user account
   * Returns JWT tokens for authenticated session
   */
  async externalLogin(data: ExternalAuthRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/external-login', data);

    // Save tokens and user data to localStorage
    if (response.data.success && response.data.token) {
      this.saveAuthData(response.data);
    }

    return response.data;
  }

  /**
   * Logout current user
   * Clears tokens from backend and localStorage
   */
  async logout(): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/logout');
      this.clearAuthData();
      return response.data;
    } catch (error) {
      // Clear local data even if API call fails
      this.clearAuthData();
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/refresh-token', data);

    // Update tokens in localStorage
    if (response.data.success && response.data.token) {
      this.saveAuthData(response.data);
    }

    return response.data;
  }

  /**
   * Request password reset OTP
   * Sends OTP to email (expires in 10 minutes)
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/forgot-password', data);
    return response.data;
  }

  /**
   * Verify OTP for password reset
   */
  async verifyOtp(data: VerifyOtpRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/verify-otp', data);
    return response.data;
  }

  /**
   * Reset password after OTP verification
   * OTP must be verified first
   */
  async resetPassword(data: ResetPasswordRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/reset-password', data);
    return response.data;
  }

  /**
   * Get current user information
   * Requires authentication
   */
  async getCurrentUser(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>('/auth/me');
    return response.data;
  }

  /**
   * Save authentication data to localStorage
   */
  private saveAuthData(data: AuthResponse): void {
    if (typeof window !== 'undefined') {
      if (data.token) {
        localStorage.setItem('accessToken', data.token);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      if (data.tokenExpiry) {
        localStorage.setItem('tokenExpiry', data.tokenExpiry);
      }
    }
  }

  /**
   * Clear authentication data from localStorage
   */
  private clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('accessToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (!token || !tokenExpiry) return false;

    // Check if token is expired
    const expiryDate = new Date(tokenExpiry);
    const now = new Date();

    return expiryDate > now;
  }

  /**
   * Get stored user data
   */
  getStoredUser() {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Get stored access token
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }
}

// Export singleton instance
export default new AuthService();

// API Request Types
export interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  email: string;
  verificationCode: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

// API Response Types
export interface UserDto {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  tokenExpiry?: string;
  user?: UserDto;
}

export interface ApiError {
  success: false;
  message: string;
}

// Type guards
export function isAuthResponse(response: any): response is AuthResponse {
  return response && typeof response === 'object' && 'success' in response;
}

export function isApiError(error: any): error is ApiError {
  return error && typeof error === 'object' && error.success === false && 'message' in error;
}

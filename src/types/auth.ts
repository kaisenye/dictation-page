// User-related types
export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

// Authentication request/response types
export interface SignInRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

// Form state types (for UI components)
export interface SignInFormData {
  email: string
  password: string
}

export interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Error types
export interface AuthError {
  code: string
  message: string
  field?: string // Which form field caused the error
}

// Loading and UI state types
export interface AuthState {
  isLoading: boolean
  user: User | null
  error: AuthError | null
}

// OAuth/IdP related types (for your Stage 3)
export interface IdPAuthRequest {
  redirectUri: string
  state: string
  codeChallenge?: string
  codeChallengeMethod?: string
}

export interface IdPAuthResponse {
  code: string
  state: string
}
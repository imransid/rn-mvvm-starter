export interface ActiveToken {
  token_id: number;
  user_id: number;
  refresh_token: string;
  issued_at: string;
  revoked_at: string | null;
  log_id?: number;
  action?: string;
  ip_address?: string | null;
  user_agent?: string | null;
  cre_date?: string;
}

export interface User {
  user_id: number;
  first_name: string;
  last_name?: string;
  email: string;
  onboarding_step?: string | null;
  gender?: string;
  birth_date?: string | null;
  preferred_language?: string;
  country?: string;
  role: string;
  family_id?: number;
  cre_date?: string;
  mod_date?: string;
  del_date?: string | null;
  last_mod_by?: string | null;
  is_email_verified?: boolean;
  email_verified_at?: string;
  password_reset_at?: string | null;
  avatar_url?: string | null;
  active_tokens?: ActiveToken[];
}

export interface ConnectedDevice {
  id: string;
  name: string;
  platform: string;
  lastActive: string;
}

export interface AuthState {
  users: User[];
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  connectedDevicesStatus: string;
  connectedDevicesError: string | null;
  connectedDevices: ConnectedDevice[];
  access_token: string | null;
  error: string | null;
  lastRefreshTime: number | null;
  tutorialStatus : boolean;
}

export const initialState: AuthState = {
  users: [],
  user: null,
  isAuthenticated: false,
  loading: false,
  connectedDevicesStatus: "",
  connectedDevicesError: null,
  connectedDevices: [],
  access_token: null,
  error: null,
  lastRefreshTime: null,
  tutorialStatus: false
};

export interface Tokens {
  accessToken: string;
  refreshToken?: string; // optional if you have refresh token
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
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
}

export  const initialState: AuthState = {
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
};
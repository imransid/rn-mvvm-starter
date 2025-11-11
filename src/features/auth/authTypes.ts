export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

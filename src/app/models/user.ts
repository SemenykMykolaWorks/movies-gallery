export interface User {
  code: number;
  status: string;
  result: UserInfo[];
}

export interface UserInfo {
  id: number;
  country: string;
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  createdAt: number;
}

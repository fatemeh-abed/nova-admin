import axiosInstance from '../api/axiosInstance';
import type {
  CreateUserRequest,
  CreateUserResponse,
  User,
  UserApiModel,
} from '../../types/user.types';

// The API returns passwords; drop them before data leaves the service layer.
const stripPassword = ({ password: _password, ...user }: UserApiModel): User => user;

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<UserApiModel[]>('/users');
  return data.map(stripPassword);
};

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await axiosInstance.get<UserApiModel>(`/users/${id}`);
  return stripPassword(data);
};

// The mock API echoes an id but does not persist the user.
export const createUser = async (payload: CreateUserRequest): Promise<User> => {
  const { data } = await axiosInstance.post<CreateUserResponse>('/users', payload);
  const { password: _password, ...user } = payload;
  return { ...user, id: data.id };
};

export interface UserName {
  firstname: string;
  lastname: string;
}

export interface GeoLocation {
  lat: string;
  long: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: GeoLocation;
}

// User as stored in Redux / shown in the UI. Never contains a password.
export interface User {
  id: number;
  email: string;
  username: string;
  name: UserName;
  phone: string;
  address?: UserAddress;
}

// Shape returned by GET /users and GET /users/:id. The API includes the password;
// the service strips it before data leaves the service layer.
export interface UserApiModel extends User {
  password: string;
}

// Body sent to POST /users. Password exists only here, only for the request.
export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  name: UserName;
  phone: string;
  address?: UserAddress;
}

export interface CreateUserResponse {
  id: number;
}

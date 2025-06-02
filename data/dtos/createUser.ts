// src/data/dtos/UserDTO.ts

export interface PhoneDTO {
  country: string;
  ddd: string;
  number: string;
}

export interface SignupRequestDTO {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
  phone: PhoneDTO;
}

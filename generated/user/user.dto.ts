export class CreateUserDto {
  id: number;
  username: string;
  password?: string;
  email: string;
  role: string;
}

export class UpdateUserDto {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  role?: string;
}
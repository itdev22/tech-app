import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';


export class CreateUserDto {

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  @Matches(/[A-Z]/, { message: 'password must contain uppercase letter' })
  @Matches(/[0-9]/, { message: 'password must contain number' })
  password_hash: string;

}

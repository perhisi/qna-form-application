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
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/[A-Z]/, { message: 'password must contain uppercase letter' })
  @Matches(/[0-9]/, { message: 'password must contain number' })
  password: string;

}

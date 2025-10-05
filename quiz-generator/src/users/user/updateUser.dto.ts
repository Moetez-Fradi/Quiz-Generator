import {IsEmail, MinLength, IsOptional} from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email : string
}
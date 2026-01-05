import { IsEmail, IsString } from "class-validator";

export class RecoveryPasswordDto {

    @IsString()
    @IsEmail()
    email: string;

}
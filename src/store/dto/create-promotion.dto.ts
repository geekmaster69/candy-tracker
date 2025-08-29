import { IsNotEmpty, IsString } from "class-validator";

export class CreatePromotionDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStoreImageDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    url: string;
}
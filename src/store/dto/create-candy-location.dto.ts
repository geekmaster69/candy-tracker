import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { CreateStoreImageDto } from "./create-store-image.dto";


export class CreateCandyLocationDto {

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    promotions: string[]

    @IsNumber()
    @Min(1)
    @IsOptional()
    quantity: number;

    @IsNumber({ maxDecimalPlaces: 20 })
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNumber({ maxDecimalPlaces: 20 })
    @Min(-180)
    @Max(180)
    longitude: number;

    @IsOptional()
    @Type(() => CreateStoreImageDto)
    @ValidateNested({ each: true })
    @IsArray()
    images: CreateStoreImageDto[];



}
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { Promotion } from "../entities";
import { Type } from "class-transformer";
import { CreatePromotionDto, CreateStoreImageDto } from "./";


export class CreateStoreDto {

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    storeHours?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    whatsapp?: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    socialMedia: string[];


    @IsNumber({ maxDecimalPlaces: 8 })
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNumber({ maxDecimalPlaces: 8 })
    @Min(-180)
    @Max(180)
    longitude: number;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePromotionDto)
    promotions: CreatePromotionDto[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateStoreImageDto)
    images: CreateStoreImageDto[];


    @IsOptional()
    @Type(() => CreateStoreImageDto)
    profileImage?: CreateStoreImageDto;
}

import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { CreateStoreImageDto } from "./create-store-image.dto";


export class CreateCandyLocationDto {

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    title: string;

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
    profileImage?: CreateStoreImageDto;


}
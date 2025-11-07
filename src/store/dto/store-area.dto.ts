import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";

export class StoreAreaDto {
    @IsNumber({ maxDecimalPlaces: 20 })
    @Type(() => Number)
    @Min(-90)
    @Max(90)
    lat: number;

    @IsNumber({ maxDecimalPlaces: 20 })
    @Type(() => Number)
    @Min(-180)
    @Max(180)
    lng: number;


    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    distance?: number

}
import { PartialType } from '@nestjs/mapped-types';
import { CreateCandyLocationDto } from './create-candy-location.dto';

export class UpdateCandyLocationDto extends PartialType(CreateCandyLocationDto) {}

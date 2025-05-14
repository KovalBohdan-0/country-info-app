import {
  IsArray,
  IsOptional,
  IsString,
  IsNumber,
  Length,
} from 'class-validator';

export class AddHolidaysDto {
  @IsString()
  @Length(2, 2)
  countryCode: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  holidays?: string[];
}

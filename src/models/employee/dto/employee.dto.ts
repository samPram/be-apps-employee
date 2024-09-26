import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsDateString()
  @IsNotEmpty()
  joined: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}

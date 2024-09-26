import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

const order = ['ASC', 'DESC'];
export class QueryDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (isNaN(value) ? 1 : parseInt(value)))
  page: number = 1;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (isNaN(value) ? 5 : parseInt(value)))
  limit: number = 5;

  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  column: string = 'name';

  @IsString()
  @IsIn(order)
  @IsOptional()
  order: 'ASC' | 'DESC' = 'ASC';
}

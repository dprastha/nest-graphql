import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsOptional, IsString } from 'class-validator';

@InputType()
export class EditLessonInput {
  @IsOptional()
  @IsString()
  @Field()
  name?: string;

  @IsOptional()
  @IsDateString()
  @Field()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @Field()
  endDate?: string;
}

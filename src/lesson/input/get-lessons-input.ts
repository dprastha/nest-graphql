import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class GetLessonsFilterInput {
  @IsOptional()
  @IsString()
  @Field()
  search?: string;
}

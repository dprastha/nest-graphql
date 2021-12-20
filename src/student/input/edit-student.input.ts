import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class EditStudentInput {
  @IsOptional()
  @IsString()
  @Field()
  firstName: string;

  @IsOptional()
  @IsString()
  @Field()
  lastName: string;
}

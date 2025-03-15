import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCourseInput } from './create-course.input';

@InputType('UpdateCourse')
export class UpdateCourseInput extends PartialType(CreateCourseInput) {}

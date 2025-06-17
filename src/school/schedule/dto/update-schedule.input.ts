import { CreateScheduleInput } from './create-schedule.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateSchedule')
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {}

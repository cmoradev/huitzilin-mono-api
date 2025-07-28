import { IsNotEmpty, Matches } from 'class-validator';

export class IncomeParams {
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'start must be a valid date in YYYY-MM-DD format',
  })
  start: string;

  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'end must be a valid date in YYYY-MM-DD format',
  })
  end: string;
}

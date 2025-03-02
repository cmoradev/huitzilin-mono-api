import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionResolver } from './action.resolver';

@Module({
  providers: [ActionResolver, ActionService],
})
export class ActionModule {}

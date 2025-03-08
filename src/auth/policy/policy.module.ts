import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyResolver } from './policy.resolver';

@Module({
  providers: [PolicyResolver, PolicyService],
})
export class PolicyModule {}

import { Module } from '@nestjs/common';
import { ActionModule } from './action/action.module';
import { BranchModule } from './branch/branch.module';
import { PolicyModule } from './policy/policy.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ActionModule, BranchModule, PolicyModule, UserModule],
})
export class AuthModule {}

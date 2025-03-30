import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch, User } from 'src/auth';
import { ConfigKey } from 'src/common/config';
import { Cycle } from 'src/school';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Branch, Cycle]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigKey.SECRET_KEY),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}

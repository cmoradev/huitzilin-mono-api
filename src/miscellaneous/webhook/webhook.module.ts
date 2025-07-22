import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from 'src/finance';
import { ClipLink } from '../clip-links/entities/clip-link.entity';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClipLink, Income])],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}

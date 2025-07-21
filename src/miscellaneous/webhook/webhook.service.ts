import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
  create(createWebhookDto: CreateWebhookDto) {
    console.log('Webhook created:', createWebhookDto);
    return 'This action adds a new webhook';
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ListenPaymentDto } from './dto/listen-payment.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('clip')
  create(@Body() params: ListenPaymentDto) {
    return this.webhookService.listenClipUpdates(params);
  }
}

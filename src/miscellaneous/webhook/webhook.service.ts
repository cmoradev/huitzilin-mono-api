import { ConflictException, Injectable } from '@nestjs/common';
import { ListenPaymentDto } from './dto/listen-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClipLink } from '../clip-links/entities/clip-link.entity';
import { Repository } from 'typeorm';
import { getStateLink } from './helpers';
import { LinkClipStatus } from 'src/finance/income/types';
import { StateLinkResponse } from './types';
import { Income } from 'src/finance';
import { IncomeState } from 'src/finance/income/enum';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(ClipLink)
    private readonly _clipLinkRepository: Repository<ClipLink>,
    @InjectRepository(Income)
    private readonly _incomeRepository: Repository<Income>,
  ) {}

  /**
   * TODO: Implementar colas
   */
  async listenClipUpdates(params: ListenPaymentDto) {
    const { account } = await this.getAccount(params);

    const state = await getStateLink(params.id, account.token);

    await this.saveOnlyPayment(state);

    return params;
  }

  async saveOnlyPayment(state: StateLinkResponse) {
    if (state.status === LinkClipStatus.CHECKOUT_COMPLETED) {
      const {
        metadata: { external_reference },
      } = state;

      const income = await this.getIncome(external_reference);

      if (!income.pendingPayment || income.state !== IncomeState.PENDING)
        return;

      console.log('Estado del link:', state);
      console.log('Ingreso encontrado:', income);
    }
  }

  private async getIncome(incomeId: string) {
    const income = await this._incomeRepository.findOne({
      where: { id: incomeId },
      relations: ['concepts', 'payments'],
    });

    if (!income) {
      throw new ConflictException(
        `No se encontró el ingreso con id: ${incomeId}`,
      );
    }

    return income;
  }

  private async getAccount(params: ListenPaymentDto) {
    const link = await this._clipLinkRepository.findOne({
      where: { requestId: params.id },
      relations: ['account'],
    });

    if (!link?.id && !link?.account?.id) {
      throw new ConflictException(
        `No se encontró el link con requestId: ${params.id}`,
      );
    }

    return {
      account: link.account,
      linkId: link.id,
    };
  }
}

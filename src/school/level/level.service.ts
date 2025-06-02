import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { SetOrderInput, UpdateCountResponse } from 'src/common/dtos';

@Injectable()
export class LevelService extends TypeOrmQueryService<Level> {
  constructor(
    @InjectRepository(Level)
    private readonly _levelRepository: Repository<Level>,
  ) {
    super(_levelRepository, { useSoftDelete: true });
  }

  public async setOrderLevels(
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    const levels = await this._levelRepository.save(params);

    return {
      updatedCount: levels.length,
    };
  }
}

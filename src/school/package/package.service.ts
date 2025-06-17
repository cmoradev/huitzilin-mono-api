import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryService } from '@ptc-org/nestjs-query-typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { UpdateCountResponse } from 'src/common/dtos/update.count.response.dto';
import { SetOrderInput } from 'src/common/dtos';
@Injectable()
export class PackageService extends TypeOrmQueryService<Package> {
  constructor(
    @InjectRepository(Package)
    private readonly _packageRepository: Repository<Package>,
  ) {
    super(_packageRepository, { useSoftDelete: true });
  }

  public async setOrderPackages(
    params: SetOrderInput[],
  ): Promise<UpdateCountResponse> {
    const packages = await this._packageRepository.save(params);

    return {
      updatedCount: packages.length,
    };
  }
}

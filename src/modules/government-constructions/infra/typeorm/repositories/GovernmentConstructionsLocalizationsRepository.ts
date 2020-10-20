import ICreateConstructionsLocalizationDTO from '@modules/government-constructions/dtos/ICreateConstructionsLocalizationDTO';
import IGovernmentConstructionsLocalizationsRepository from '@modules/government-constructions/repositories/IGovernmentConstructionsLocalizationsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import GovernmentConstructionsLocalizations from '../schemas/GovernmentConstructionsLocalizations';

class GovernmentConstructionsLocalizationsRepository
  implements IGovernmentConstructionsLocalizationsRepository {
  private ormRepository: MongoRepository<GovernmentConstructionsLocalizations>;

  constructor() {
    this.ormRepository = getMongoRepository(
      GovernmentConstructionsLocalizations,
      'mongo',
    );
  }

  public async create(
    _data: ICreateConstructionsLocalizationDTO,
  ): Promise<GovernmentConstructionsLocalizations> {
    const governmentConstructionsLocalization = this.ormRepository.create(
      _data,
    );

    await this.ormRepository.save(governmentConstructionsLocalization);

    return governmentConstructionsLocalization;
  }

  findByConstructionLocalizarionId(
    construction_id: string,
  ): Promise<GovernmentConstructionsLocalizations | undefined> {
    throw new Error('Method not implemented.');
  }
}

export default GovernmentConstructionsLocalizationsRepository;

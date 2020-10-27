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

  public async update(
    data: GovernmentConstructionsLocalizations,
  ): Promise<GovernmentConstructionsLocalizations> {
    return this.ormRepository.save(data);
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

  public async findByConstructionLocalizarionId(
    construction_id: string,
  ): Promise<GovernmentConstructionsLocalizations | undefined> {
    const construction = await this.ormRepository.findOne({
      where: { construction_id },
    });
    return construction;
  }
}

export default GovernmentConstructionsLocalizationsRepository;

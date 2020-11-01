import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateConstructionsExpenditureDTO from '@modules/government-constructions/dtos/ICreateConstructionsExpenditureDTO';
import IGovernmentConstructionsExpenditureRepository from '@modules/government-constructions/repositories/IGovernmentConstructionsExpenditureRepository';
import GovernmentConstructionsExpenditure from '../schemas/GovernmentConstructionsExpenditure';

class GovernmentConstructionsExpenditureRepository
  implements IGovernmentConstructionsExpenditureRepository {
  private ormRepository: MongoRepository<GovernmentConstructionsExpenditure>;

  constructor() {
    this.ormRepository = getMongoRepository(
      GovernmentConstructionsExpenditure,
      'mongo',
    );
  }

  public async create(
    data: ICreateConstructionsExpenditureDTO,
  ): Promise<GovernmentConstructionsExpenditure> {
    const governmentConstructionsExpenditure = this.ormRepository.create(data);

    await this.ormRepository.save(governmentConstructionsExpenditure);

    return governmentConstructionsExpenditure;
  }

  public async findByConstructionStatusId(
    statusId: number,
  ): Promise<GovernmentConstructionsExpenditure | undefined> {
    const expenditure = await this.ormRepository.findOne({
      where: { statusId },
    });
    return expenditure;
  }

  public async update(
    data: GovernmentConstructionsExpenditure,
  ): Promise<GovernmentConstructionsExpenditure> {
    return this.ormRepository.save(data);
  }
}

export default GovernmentConstructionsExpenditureRepository;

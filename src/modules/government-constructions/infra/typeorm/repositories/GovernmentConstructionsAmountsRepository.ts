import ICreateConstructionsAmountDTO from '@modules/government-constructions/dtos/ICreateConstructionsAmountDTO';
import IGovernmentConstructionsAmountsRepository from '@modules/government-constructions/repositories/IGovernmentConstructionsAmountsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import GovernmentConstructionsAmounts from '../schemas/GovernmentConstructionsAmounts';

class GovernmentConstructionsAmountsRepository
  implements IGovernmentConstructionsAmountsRepository {
  private ormRepository: MongoRepository<GovernmentConstructionsAmounts>;

  constructor() {
    this.ormRepository = getMongoRepository(
      GovernmentConstructionsAmounts,
      'mongo',
    );
  }

  public async create(
    _data: ICreateConstructionsAmountDTO,
  ): Promise<GovernmentConstructionsAmounts> {
    const governmentConstructionsamount = this.ormRepository.create(_data);

    await this.ormRepository.save(governmentConstructionsamount);

    return governmentConstructionsamount;
  }
}

export default GovernmentConstructionsAmountsRepository;

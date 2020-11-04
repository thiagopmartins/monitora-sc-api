import ICreateConstructionsAmountDTO from '@modules/government-constructions/dtos/ICreateConstructionsAmountDTO';
import IFindConstructionsAmountDTO from '@modules/government-constructions/dtos/IFindConstructionsAmountDTO';
import GovernmentConstructionsAmounts from '@modules/government-constructions/infra/typeorm/schemas/GovernmentConstructionsAmounts';
import { uuid } from 'uuidv4';
import IGovernmentConstructionsAmountsRepository from '../IGovernmentConstructionsAmountsRepository';

class FakeConstructionsAmountRepository
  implements IGovernmentConstructionsAmountsRepository {
  public constructions: GovernmentConstructionsAmounts[] = [];

  public async create(
    constructionDTO: ICreateConstructionsAmountDTO,
  ): Promise<GovernmentConstructionsAmounts> {
    const construction = new GovernmentConstructionsAmounts();

    const date = new Date();

    Object.assign(
      construction,
      { id: uuid(), created_at: date, updated_at: date },
      constructionDTO,
    );
    this.constructions.push(construction);

    return construction;
  }

  public async update(
    construction: GovernmentConstructionsAmounts,
  ): Promise<GovernmentConstructionsAmounts> {
    const findIndex = this.constructions.findIndex(
      findConstruction => findConstruction.id === construction.id,
    );

    this.constructions[findIndex] = construction;

    return construction;
  }

  public async findByConstructionAmountId(
    id: number,
  ): Promise<GovernmentConstructionsAmounts | undefined> {
    const findConstruction = this.constructions.find(
      construction => construction.construction_amount_id === id,
    );
    return findConstruction;
  }

  public async find(
    filter: IFindConstructionsAmountDTO | undefined,
  ): Promise<GovernmentConstructionsAmounts[]> {
    if (filter === undefined) {
      return this.constructions;
    }

    if (filter.year === undefined) {
      return this.constructions.filter(x => filter.status.includes(x.status));
    }

    if (filter.status === undefined) {
      return this.constructions.filter(x => {
        return x.year >= filter.year.initial && x.year <= filter.year.finish;
      });
    }

    return this.constructions.filter(
      x =>
        filter.status.includes(x.status) &&
        x.year >= filter.year.initial &&
        x.year <= filter.year.finish,
    );
  }
}

export default FakeConstructionsAmountRepository;

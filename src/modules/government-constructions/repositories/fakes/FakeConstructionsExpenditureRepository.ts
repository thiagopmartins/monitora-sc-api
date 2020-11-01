import ICreateConstructionsExpenditureDTO from '@modules/government-constructions/dtos/ICreateConstructionsExpenditureDTO';
import GovernmentConstructionsExpenditure from '@modules/government-constructions/infra/typeorm/schemas/GovernmentConstructionsExpenditure';
import { uuid } from 'uuidv4';
import IGovernmentConstructionsExpenditureRepository from '../IGovernmentConstructionsExpenditureRepository';

class FakeConstructionsExpenditureRepository
  implements IGovernmentConstructionsExpenditureRepository {
  public expenditures: GovernmentConstructionsExpenditure[] = [];

  public async create(
    expenditureDTO: ICreateConstructionsExpenditureDTO,
  ): Promise<GovernmentConstructionsExpenditure> {
    const expenditure = new GovernmentConstructionsExpenditure();

    const date = new Date();

    Object.assign(
      expenditure,
      { id: uuid(), created_at: date, updated_at: date },
      expenditureDTO,
    );
    this.expenditures.push(expenditure);

    return expenditure;
  }

  public async findByConstructionStatusId(
    statusId: number,
  ): Promise<GovernmentConstructionsExpenditure | undefined> {
    const findExpenditure = this.expenditures.find(
      expenditure => expenditure.statusId === statusId,
    );
    return findExpenditure;
  }

  public async update(
    data: GovernmentConstructionsExpenditure,
  ): Promise<GovernmentConstructionsExpenditure> {
    const findIndex = this.expenditures.findIndex(
      findExpenditure => findExpenditure.id === data.id,
    );

    this.expenditures[findIndex] = data;

    return data;
  }
}

export default FakeConstructionsExpenditureRepository;

import ICreateConstructionsExpenditureDTO from '../dtos/ICreateConstructionsExpenditureDTO';
import GovernmentConstructionsExpenditure from '../infra/typeorm/schemas/GovernmentConstructionsExpenditure';

export default interface IGovernmentConstructionsExpenditureRepository {
  create(
    data: ICreateConstructionsExpenditureDTO,
  ): Promise<GovernmentConstructionsExpenditure>;

  findByConstructionStatusId(
    statusId: number,
  ): Promise<GovernmentConstructionsExpenditure | undefined>;

  update(
    data: GovernmentConstructionsExpenditure,
  ): Promise<GovernmentConstructionsExpenditure>;
}

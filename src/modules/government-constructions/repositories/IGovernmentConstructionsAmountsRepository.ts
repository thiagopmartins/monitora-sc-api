import ICreateConstructionsAmountDTO from '../dtos/ICreateConstructionsAmountDTO';
import IFindConstructionsAmountDTO from '../dtos/IFindConstructionsAmountDTO';
import GovernmentConstructionsAmounts from '../infra/typeorm/schemas/GovernmentConstructionsAmounts';

export default interface IGovernmentConstructionsAmountsRepository {
  create(
    data: ICreateConstructionsAmountDTO,
  ): Promise<GovernmentConstructionsAmounts>;

  findByConstructionAmountId(
    construction_amount_id: number,
  ): Promise<GovernmentConstructionsAmounts | undefined>;

  update(
    data: GovernmentConstructionsAmounts,
  ): Promise<GovernmentConstructionsAmounts>;

  find(
    filter: IFindConstructionsAmountDTO | undefined,
  ): Promise<GovernmentConstructionsAmounts[]>;
}

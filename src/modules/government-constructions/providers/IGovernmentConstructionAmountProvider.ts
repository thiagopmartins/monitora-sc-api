import GovernmentConstructionsAmounts from '../infra/typeorm/schemas/GovernmentConstructionsAmounts';

export default interface IGovernmentConstructionAmountProvider {
  getAll(): Promise<GovernmentConstructionsAmounts[] | undefined>;
}

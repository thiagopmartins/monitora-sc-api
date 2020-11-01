import GovernmentConstructionsExpenditure from '../infra/typeorm/schemas/GovernmentConstructionsExpenditure';

export default interface IGovernmentConstructionsExpenditureProvider {
  getAll(): Promise<GovernmentConstructionsExpenditure[] | undefined>;
}

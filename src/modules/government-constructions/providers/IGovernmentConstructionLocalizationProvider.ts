import GovernmentConstructionsLocalizations from '../infra/typeorm/schemas/GovernmentConstructionsLocalizations';

export default interface IGovernmentConstructionLocalizationProvider {
  getAll(): Promise<GovernmentConstructionsLocalizations[] | undefined>;
}

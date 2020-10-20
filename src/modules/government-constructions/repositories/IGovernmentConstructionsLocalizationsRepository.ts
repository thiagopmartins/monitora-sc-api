import ICreateConstructionsLocalizationDTO from '../dtos/ICreateConstructionsLocalizationDTO';
import GovernmentConstructionsLocalizations from '../infra/typeorm/schemas/GovernmentConstructionsLocalizations';

export default interface IGovernmentConstructionsLocalizationsRepository {
  create(
    data: ICreateConstructionsLocalizationDTO,
  ): Promise<GovernmentConstructionsLocalizations>;
  findByConstructionLocalizarionId(
    construction_id: string,
  ): Promise<GovernmentConstructionsLocalizations | undefined>;
}

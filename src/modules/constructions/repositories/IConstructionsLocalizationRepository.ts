import ICreateConstructionsLocalizationDTO from '../dtos/ICreateConstructionsLocalizationDTO';
import IConstructionsLocalization from '../infra/mongoose/entities/IConstructionsLocalization';
import { ConstructionLocalizationType } from '../infra/mongoose/schemas/ConstructionLocalizationSchema';

export default interface IConstructionsLocalizationRepository {
  create(
    data: ICreateConstructionsLocalizationDTO,
  ): Promise<ConstructionLocalizationType>;
  findByConstructionLocalizarionId(
    id: string,
  ): Promise<IConstructionsLocalization | undefined>;
}

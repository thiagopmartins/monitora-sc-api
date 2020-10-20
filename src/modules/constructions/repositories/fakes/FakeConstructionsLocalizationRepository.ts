import ICreateConstructionsLocalizationDTO from '@modules/constructions/dtos/ICreateConstructionsLocalizationDTO';
import IConstructionsLocalization from '@modules/constructions/infra/mongoose/entities/IConstructionsLocalization';
import { ConstructionLocalizationType } from '@modules/constructions/infra/mongoose/schemas/ConstructionLocalizationSchema';
import { uuid } from 'uuidv4';
import IConstructionsLocalizationRepository from '../IConstructionsLocalizationRepository';

class FakeConstructionsLocalizationRepository
  implements IConstructionsLocalizationRepository {
  private constructions: IConstructionsLocalization[] = [];

  public async create(
    construction: ICreateConstructionsLocalizationDTO,
  ): Promise<ConstructionLocalizationType> {
    const teste: ConstructionLocalizationType = {};
    Object.assign(teste, { id: uuid() }, construction);
    this.constructions.push(construction);

    return teste;
  }

  public async findByConstructionLocalizarionId(
    id: string,
  ): Promise<IConstructionsLocalization | undefined> {
    const findConstruction = this.constructions.find(
      construction => construction.id === id,
    );
    return findConstruction;
  }
}

export default FakeConstructionsLocalizationRepository;

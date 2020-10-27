import ICreateConstructionsLocalizationDTO from '@modules/government-constructions/dtos/ICreateConstructionsLocalizationDTO';
import GovernmentConstructionsLocalizations from '@modules/government-constructions/infra/typeorm/schemas/GovernmentConstructionsLocalizations';
import { uuid } from 'uuidv4';
import IGovernmentConstructionsLocalizationsRepository from '../IGovernmentConstructionsLocalizationsRepository';

class FakeConstructionsLocalizationRepository
  implements IGovernmentConstructionsLocalizationsRepository {
  public constructions: GovernmentConstructionsLocalizations[] = [];

  public async update(
    construction: GovernmentConstructionsLocalizations,
  ): Promise<GovernmentConstructionsLocalizations> {
    const findIndex = this.constructions.findIndex(
      findConstruction => findConstruction.id === construction.id,
    );

    this.constructions[findIndex] = construction;

    return construction;
  }

  public async create(
    constructionDTO: ICreateConstructionsLocalizationDTO,
  ): Promise<GovernmentConstructionsLocalizations> {
    const construction = new GovernmentConstructionsLocalizations();

    const date = new Date();

    Object.assign(
      construction,
      { id: uuid(), created_at: date, updated_at: date },
      constructionDTO,
    );
    this.constructions.push(construction);

    return construction;
  }

  public async findByConstructionLocalizarionId(
    id: string,
  ): Promise<GovernmentConstructionsLocalizations | undefined> {
    const findConstruction = this.constructions.find(
      construction => construction.construction_id === id,
    );
    return findConstruction;
  }
}

export default FakeConstructionsLocalizationRepository;

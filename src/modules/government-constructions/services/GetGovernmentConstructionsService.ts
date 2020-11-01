import { inject, injectable } from 'tsyringe';
import ICreateConstructionsLocalizationDTO from '../dtos/ICreateConstructionsLocalizationDTO';
import IGovernmentConstructionLocalizationProvider from '../providers/IGovernmentConstructionLocalizationProvider';
import IGovernmentConstructionsLocalizationsRepository from '../repositories/IGovernmentConstructionsLocalizationsRepository';

@injectable()
class GetGovernnmentConstructionsService {
  constructor(
    @inject('GovernmentConstructionsLocalizationsRepository')
    private governmentConstructionsLocalizationsRepository: IGovernmentConstructionsLocalizationsRepository,

    @inject('GovernmentConstructionsLocalizationsProvider')
    private governmentConstructionsLocalizationProvider: IGovernmentConstructionLocalizationProvider,
  ) {}

  public async execute(): Promise<void> {
    const result = await this.governmentConstructionsLocalizationProvider.getAll();
    if (result !== undefined) {
      result.map(async construction => {
        const constructionAlreadyExists = await this.governmentConstructionsLocalizationsRepository.findByConstructionLocalizarionId(
          construction.construction_id,
        );

        if (!constructionAlreadyExists) {
          await this.governmentConstructionsLocalizationsRepository.create(
            construction as ICreateConstructionsLocalizationDTO,
          );
        } else {
          await this.governmentConstructionsLocalizationsRepository.update(
            constructionAlreadyExists,
          );
        }
      });
    }
  }
}

export default GetGovernnmentConstructionsService;

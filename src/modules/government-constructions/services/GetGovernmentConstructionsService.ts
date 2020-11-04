import { inject, injectable } from 'tsyringe';
import ICreateConstructionsLocalizationDTO from '../dtos/ICreateConstructionsLocalizationDTO';
import GovernmentConstructionsLocalizations from '../infra/typeorm/schemas/GovernmentConstructionsLocalizations';
import IGovernmentConstructionLocalizationProvider from '../providers/IGovernmentConstructionLocalizationProvider';
import IGovernmentConstructionsLocalizationsRepository from '../repositories/IGovernmentConstructionsLocalizationsRepository';

@injectable()
class GetGovernnmentConstructionsService {
  private constructionList: GovernmentConstructionsLocalizations[] = [];

  constructor(
    @inject('GovernmentConstructionsLocalizationsRepository')
    private governmentConstructionsLocalizationsRepository: IGovernmentConstructionsLocalizationsRepository,

    @inject('GovernmentConstructionsLocalizationsProvider')
    private governmentConstructionsLocalizationProvider: IGovernmentConstructionLocalizationProvider,
  ) {}

  public async execute(): Promise<
    GovernmentConstructionsLocalizations[] | undefined
  > {
    const result = await this.governmentConstructionsLocalizationProvider.getAll();
    if (result !== undefined) {
      this.constructionList = await Promise.all(
        result.map(
          async (
            construction,
          ): Promise<GovernmentConstructionsLocalizations> => {
            let constructionSaved;
            const constructionAlreadyExists = await this.governmentConstructionsLocalizationsRepository.findByConstructionLocalizarionId(
              construction.construction_id,
            );

            if (!constructionAlreadyExists) {
              constructionSaved = await this.governmentConstructionsLocalizationsRepository.create(
                construction as ICreateConstructionsLocalizationDTO,
              );
            } else {
              constructionSaved = await this.governmentConstructionsLocalizationsRepository.update(
                constructionAlreadyExists,
              );
            }
            return constructionSaved;
          },
        ),
      );
    }
    return this.constructionList;
  }
}

export default GetGovernnmentConstructionsService;

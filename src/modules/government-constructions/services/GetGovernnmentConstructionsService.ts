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
    private governmentConstructionsLocalizationProvicer: IGovernmentConstructionLocalizationProvider,
  ) {}

  public async execute(): Promise<void> {
    const result = await this.governmentConstructionsLocalizationProvicer.getAll();

    if (result !== undefined) {
      result.map((construction: ICreateConstructionsLocalizationDTO) =>
        this.governmentConstructionsLocalizationsRepository.create(
          construction,
        ),
      );
    }
  }
}

export default GetGovernnmentConstructionsService;

import { inject, injectable } from 'tsyringe';
import ICreateConstructionsLocalizationDTO from '../dtos/ICreateConstructionsLocalizationDTO';
import IGovarnamentConstructionLocalizationProvider from '../providers/IGovarnamentConstructionLocalizationProvider';
import IConstructionsLocalizationRepository from '../repositories/IConstructionsLocalizationRepository';

@injectable()
class GetGovernanmentConstructionsService {
  constructor(
    @inject('ConstructionsLocalizationRepository')
    private constructionsLocalizationRepository: IConstructionsLocalizationRepository,

    @inject('GovarnamentConstructionsLocalization')
    private govarnamentConstructionsLocalizationProvicer: IGovarnamentConstructionLocalizationProvider,
  ) {}

  public async execute(): Promise<void> {
    const result = await this.govarnamentConstructionsLocalizationProvicer.getAll();

    if (result !== undefined) {
      JSON.parse(result).map((x: ICreateConstructionsLocalizationDTO) =>
        this.constructionsLocalizationRepository.create(x),
      );
    }
  }
}

export default GetGovernanmentConstructionsService;

import { inject, injectable } from 'tsyringe';
import ICreateConstructionsAmountDTO from '../dtos/ICreateConstructionsAmountDTO';
import GovernmentConstructionsLocalizations from '../infra/typeorm/schemas/GovernmentConstructionsLocalizations';
import IGovernmentConstructionAmountProvider from '../providers/IGovernmentConstructionAmountProvider';
import IGovernmentConstructionsAmountsRepository from '../repositories/IGovernmentConstructionsAmountsRepository';

@injectable()
class GetGovernnmentConstructionsAmountService {
  constructor(
    @inject('GovernmentConstructionsAmountsRepository')
    private governmentConstructionsAmountsRepository: IGovernmentConstructionsAmountsRepository,

    @inject('GovernmentConstructionsAmountsProvider')
    private governmentConstructionsAmountsProvider: IGovernmentConstructionAmountProvider,
  ) {}

  public async execute(
    constructionLocalization:
      | GovernmentConstructionsLocalizations[]
      | undefined,
  ): Promise<void> {
    const result = await this.governmentConstructionsAmountsProvider.getAll();
    if (result !== undefined && constructionLocalization !== undefined) {
      result.map(async construction => {
        const constructionAlreadyExists = await this.governmentConstructionsAmountsRepository.findByConstructionAmountId(
          construction.construction_amount_id,
        );

        if (!constructionAlreadyExists) {
          const constructionFinded = constructionLocalization.find(x =>
            x.projectsId.find(p => p === construction.construction_amount_id),
          );

          Object.assign(
            construction,
            {
              latitude: constructionFinded?.nuLatitude,
              longitude: constructionFinded?.nuLongitude,
            },
            construction,
          );

          await this.governmentConstructionsAmountsRepository.create(
            construction as ICreateConstructionsAmountDTO,
          );
        } else {
          await this.governmentConstructionsAmountsRepository.update(
            constructionAlreadyExists,
          );
        }
      });
    }
  }
}

export default GetGovernnmentConstructionsAmountService;

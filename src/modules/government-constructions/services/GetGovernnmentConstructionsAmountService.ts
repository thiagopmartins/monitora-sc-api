import { inject, injectable } from 'tsyringe';
import ICreateConstructionsAmountDTO from '../dtos/ICreateConstructionsAmountDTO';
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

  public async execute(): Promise<void> {
    const result = await this.governmentConstructionsAmountsProvider.getAll();
    if (result !== undefined) {
      result.map(async construction => {
        await this.governmentConstructionsAmountsRepository.create(
          construction as ICreateConstructionsAmountDTO,
        );
      });
    }
  }
}

export default GetGovernnmentConstructionsAmountService;

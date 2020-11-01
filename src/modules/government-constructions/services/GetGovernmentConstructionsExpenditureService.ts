import { inject, injectable } from 'tsyringe';
import ICreateConstructionsExpenditureDTO from '../dtos/ICreateConstructionsExpenditureDTO';
import IGovernmentConstructionsExpenditureProvider from '../providers/IGovernmentConstructionsExpenditureProvider';
import IGovernmentConstructionsExpenditureRepository from '../repositories/IGovernmentConstructionsExpenditureRepository';

@injectable()
class GetGovernmentConstructionsExpenditureService {
  constructor(
    @inject('GovernmentConstructionsExpenditureRepository')
    private governmentConstructionsExpenditureRepository: IGovernmentConstructionsExpenditureRepository,

    @inject('GovernmentConstructionsExpenditureProvider')
    private governmentConstructionsExpenditureProvider: IGovernmentConstructionsExpenditureProvider,
  ) {}

  public async execute(): Promise<void> {
    const result = await this.governmentConstructionsExpenditureProvider.getAll();
    if (result !== undefined) {
      result.map(async expenditure => {
        const expenditureAlreadyExists = await this.governmentConstructionsExpenditureRepository.findByConstructionStatusId(
          expenditure.statusId,
        );

        if (!expenditureAlreadyExists) {
          await this.governmentConstructionsExpenditureRepository.create(
            expenditure as ICreateConstructionsExpenditureDTO,
          );
        } else {
          await this.governmentConstructionsExpenditureRepository.update(
            expenditureAlreadyExists,
          );
        }
      });
    }
  }
}

export default GetGovernmentConstructionsExpenditureService;

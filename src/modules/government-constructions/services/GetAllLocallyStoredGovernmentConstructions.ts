import { inject, injectable } from 'tsyringe';
import GovernmentConstructionsAmounts from '../infra/typeorm/schemas/GovernmentConstructionsAmounts';
import IGovernmentConstructionsAmountsRepository from '../repositories/IGovernmentConstructionsAmountsRepository';

interface IRequest {
  year: {
    initial: number;
    finish: number;
  };
  status: string[];
}

@injectable()
class GetAllLocallyStoredGovernmentConstructions {
  constructor(
    @inject('GovernmentConstructionsAmountsRepository')
    private governmentConstructionsAmountsRepository: IGovernmentConstructionsAmountsRepository,
  ) {}

  public async execute({
    year,
    status,
  }: IRequest): Promise<GovernmentConstructionsAmounts[]> {
    if (year === undefined && status === undefined) {
      return this.governmentConstructionsAmountsRepository.find();
    }

    if (year === undefined) {
      return this.governmentConstructionsAmountsRepository.findByStatus(status);
    }

    if (status === undefined) {
      return this.governmentConstructionsAmountsRepository.findByYear(year);
    }

    return this.governmentConstructionsAmountsRepository.findByStatusAndYear({
      year,
      status,
    });
  }
}

export default GetAllLocallyStoredGovernmentConstructions;

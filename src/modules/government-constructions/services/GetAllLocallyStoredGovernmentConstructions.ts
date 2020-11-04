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
    const teste = this.governmentConstructionsAmountsRepository.find({
      year,
      status,
    });

    return teste;
  }
}

export default GetAllLocallyStoredGovernmentConstructions;

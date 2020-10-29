import GovernmentConstructionsAmounts from '@modules/government-constructions/infra/typeorm/schemas/GovernmentConstructionsAmounts';
import AppError from '@shared/errors/AppError';
import IGovernmentConstructionAmountProvider from '../IGovernmentConstructionAmountProvider';

class FakeGovarnamentConstructionsAmount
  implements IGovernmentConstructionAmountProvider {
  private constructions: GovernmentConstructionsAmounts[] = [];

  public async getAll(): Promise<GovernmentConstructionsAmounts[] | undefined> {
    try {
      const construction = {
        id: 7192,
        number: '624',
        year: 2020,
        description: 'CONSTRUÇÃO DA MURALHA - CASEP CONCÓRDIA ',
        area: 'Justiça e Cidadania',
        status: 'A iniciar',
        amount: 469780.47,
        cityId: 8083,
        cityDescription: 'Concórdia',
        projectLink: null,
        peExecuted: 0.0,
        cities: [],
        contracts: [
          {
            id: 1031437,
            description: null,
            number: null,
          },
        ],
        constructionSites: [],
      };

      const governamentConstructionsAmounts = new GovernmentConstructionsAmounts();

      Object.assign(
        governamentConstructionsAmounts,
        { construction_amount_id: construction.id },
        construction,
      );

      delete governamentConstructionsAmounts.id;

      this.constructions.push(governamentConstructionsAmounts);

      return this.constructions;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default FakeGovarnamentConstructionsAmount;

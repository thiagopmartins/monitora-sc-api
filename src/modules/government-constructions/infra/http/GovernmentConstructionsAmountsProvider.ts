import IGovernmentConstructionAmountProvider from '@modules/government-constructions/providers/IGovernmentConstructionAmountProvider';
import logger from '@shared/container/providers/Logs';
import AppError from '@shared/errors/AppError';
import axios from 'axios';
import GovernmentConstructionsAmounts from '../typeorm/schemas/GovernmentConstructionsAmounts';

class GovernmentConstructionsAmountsProvider
  implements IGovernmentConstructionAmountProvider {
  public async getAll(): Promise<GovernmentConstructionsAmounts[] | undefined> {
    try {
      const result = await axios.post(
        'http://www.sicop.sc.gov.br/sef-map-backend/source/map/project/list',
        {
          period: {
            dtInicial: null,
            dtFinal: null,
          },
          projectYear: null,
          asset: [],
          area: [],
          city: [],
          status: [
            {
              id: 3,
              description: 'A iniciar',
              selected: true,
              items: null,
              expanded: true,
            },
            {
              id: 2,
              description: 'Andamento',
              selected: true,
              items: null,
              expanded: false,
            },
            {
              id: 1,
              description: 'Concluído',
              selected: true,
              items: null,
              expanded: true,
            },
            {
              id: 4,
              description: 'Paralisado',
              selected: true,
              items: [
                {
                  id: 10,
                  description: 'Paralisada até 90 dias',
                  selected: true,
                },
                {
                  id: 8,
                  description: 'Paralisada há mais de 90 dias',
                  selected: true,
                },
              ],
              expanded: true,
            },
            {
              id: 5,
              description: 'Rescindido',
              selected: true,
              items: null,
              expanded: true,
            },
            {
              id: 10,
              description: 'Paralisada até 90 dias',
              selected: true,
            },
            {
              id: 8,
              description: 'Paralisada há mais de 90 dias',
              selected: true,
            },
          ],
          contractor: [],
          contracted: [],
          projectType: [
            {
              id: 2,
              description: 'Investimento',
              selected: true,
            },
          ],
        },
      );

      const governamentConstructionsAmountsList: GovernmentConstructionsAmounts[] = [];

      // eslint-disable-next-line array-callback-return
      result.data.map((construction: { id: string }) => {
        const governamentConstructionsAmounts = new GovernmentConstructionsAmounts();

        Object.assign(
          governamentConstructionsAmounts,
          { construction_amount_id: construction.id },
          construction,
        );

        delete governamentConstructionsAmounts.id;

        governamentConstructionsAmountsList.push(
          governamentConstructionsAmounts,
        );
      });

      logger.info(
        `Foram encontradas ${governamentConstructionsAmountsList.length} valores de obras na api do governo.`,
      );

      return governamentConstructionsAmountsList;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default GovernmentConstructionsAmountsProvider;

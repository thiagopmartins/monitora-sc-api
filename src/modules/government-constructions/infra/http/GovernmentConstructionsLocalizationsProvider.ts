import IGovernmentConstructionLocalizationProvider from '@modules/government-constructions/providers/IGovernmentConstructionLocalizationProvider';
import AppError from '@shared/errors/AppError';
import axios from 'axios';
import GovernmentConstructionsLocalizations from '../typeorm/schemas/GovernmentConstructionsLocalizations';

class GovernmentConstructionsLocalizationsProvider
  implements IGovernmentConstructionLocalizationProvider {
  public async getAll(): Promise<
    GovernmentConstructionsLocalizations[] | undefined
  > {
    try {
      const result = await axios.post(
        'http://www.sicop.sc.gov.br/sef-map-backend/source/map/publicassets/list',
        {
          period: { dtInicial: null, dtFinal: null },
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
              expanded: false,
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
            { id: 10, description: 'Paralisada até 90 dias', selected: true },
            {
              id: 8,
              description: 'Paralisada há mais de 90 dias',
              selected: true,
            },
          ],
          contractor: [],
          contracted: [],
          projectType: [
            { id: 2, description: 'Investimento', selected: true },
            { id: 1, description: 'Manutenção', selected: true },
          ],
        },
      );

      const governamentConstructionsLocalizationsList: GovernmentConstructionsLocalizations[] = [];

      // eslint-disable-next-line array-callback-return
      result.data.map((construction: { id: string }) => {
        const governamentConstructionsLocalizations = new GovernmentConstructionsLocalizations();

        Object.assign(
          governamentConstructionsLocalizations,
          { construction_id: construction.id },
          construction,
        );

        delete governamentConstructionsLocalizations.id;

        governamentConstructionsLocalizationsList.push(
          governamentConstructionsLocalizations,
        );
      });

      return governamentConstructionsLocalizationsList;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default GovernmentConstructionsLocalizationsProvider;

import IGovarnamentConstructionLocalizationProvider from '@modules/constructions/providers/IGovarnamentConstructionLocalizationProvider';
import AppError from '@shared/errors/AppError';
import axios from 'axios';

class GovarnamentConstructionsLocalization
  implements IGovarnamentConstructionLocalizationProvider {
  public async getAll(): Promise<string | undefined> {
    try {
      return await axios.post(
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
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default GovarnamentConstructionsLocalization;

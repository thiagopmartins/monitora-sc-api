import IConstructionsLocalization from '@modules/constructions/infra/mongoose/entities/IConstructionsLocalization';
import IGovarnamentConstructionLocalizationProvider from '@modules/constructions/providers/IGovarnamentConstructionLocalizationProvider';
import AppError from '@shared/errors/AppError';

class FakeGovarnamentConstructionsLocalization
  implements IGovarnamentConstructionLocalizationProvider {
  public async getAll(): Promise<string | undefined> {
    try {
      const result: IConstructionsLocalization = {
        id: 'SC110 _24',
        description:
          'PETROLÂNDIA (ENTR. SC-284) - ENTR. BR-282 (P/ BOCAINA DO SUL)',
        nuLatitude: -27.535722175999,
        nuLongitude: -49.698887383295,
        urlPin:
          'http://www.sicop.sc.gov.br:80/mapa-smo-backend/imagens/areas/345pin.png',
        heatMapValue: 254912.79,
        coordenates: [],
        projectsId: [2239, 2259, 3992],
        contracts: [
          {
            id: 1026464,
            constructionSitesId: [1],
          },
          {
            id: 1027889,
            constructionSitesId: [1],
          },
          {
            id: 1029711,
            constructionSitesId: [1],
          },
        ],
        heatMapQuantity: 2.12,
      };

      return JSON.stringify(result);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default FakeGovarnamentConstructionsLocalization;

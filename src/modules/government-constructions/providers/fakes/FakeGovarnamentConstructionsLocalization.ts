import GovernmentConstructionsLocalizations from '@modules/government-constructions/infra/typeorm/schemas/GovernmentConstructionsLocalizations';
import AppError from '@shared/errors/AppError';
import IGovernmentConstructionLocalizationProvider from '../IGovernmentConstructionLocalizationProvider';

class FakeGovarnamentConstructionsLocalization
  implements IGovernmentConstructionLocalizationProvider {
  private constructions: GovernmentConstructionsLocalizations[] = [];

  public async getAll(): Promise<
    GovernmentConstructionsLocalizations[] | undefined
  > {
    try {
      const construction = {
        id: 'SC110 _24',
        description:
          'PETROLÂNDIA (ENTR. SC-284) - ENTR. BR-282 (P/ BOCAINA DO SUL)',
        nuLatitude: -27.535722175999,
        nuLongitude: -49.698887383295,
        urlPin:
          'http://www.sicop.sc.gov.br:80/mapa-smo-backend/imagens/areas/345pin.png',
        heatMapValue: 254912.79,
        coordenates: [],
        projectsId: [2239, 2259, 3992, 7192],
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

      const governamentConstructionsLocalizations = new GovernmentConstructionsLocalizations();

      Object.assign(
        governamentConstructionsLocalizations,
        { construction_id: construction.id },
        construction,
      );

      delete governamentConstructionsLocalizations.id;

      this.constructions.push(governamentConstructionsLocalizations);

      return this.constructions;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default FakeGovarnamentConstructionsLocalization;

import GovernmentConstructionsExpenditure from '@modules/government-constructions/infra/typeorm/schemas/GovernmentConstructionsExpenditure';
import AppError from '@shared/errors/AppError';
import IGovernmentConstructionsExpenditureProvider from '../IGovernmentConstructionsExpenditureProvider';

class FakeGovarnamentConstructionsExpenditure
  implements IGovernmentConstructionsExpenditureProvider {
  public async getAll(): Promise<
    GovernmentConstructionsExpenditure[] | undefined
  > {
    try {
      const construction = {
        infos: [
          {
            statusId: 3,
            statusDesc: 'a iniciar',
            projectsAmount: 46,
            projectsValue: 6.287068161e7,
          },
          {
            statusId: 2,
            statusDesc: 'em andamento',
            projectsAmount: 185,
            projectsValue: 2.56298338198e9,
          },
          {
            statusId: 1,
            statusDesc: 'concluídas',
            projectsAmount: 2370,
            projectsValue: 4.30347594188e9,
          },
          {
            statusId: 4,
            statusDesc: 'paralisadas',
            projectsAmount: 62,
            projectsValue: 1.24280871189e9,
          },
          {
            statusId: 5,
            statusDesc: 'rescindidas',
            projectsAmount: 35,
            projectsValue: 3.575703148e7,
          },
        ],
        urlInfoPanel:
          'http://www.sicop.sc.gov.br:80/relatoriosExterno/abrirRelSomatorioObras.do',
      };

      return construction.infos as GovernmentConstructionsExpenditure[];
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default FakeGovarnamentConstructionsExpenditure;

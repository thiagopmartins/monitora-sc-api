import * as cron from 'node-cron';
import { container } from 'tsyringe';

import logger from '@shared/container/providers/Logs';

import GetGovernmentConstructionsService from '@modules/government-constructions/services/GetGovernmentConstructionsService';
import GetGovernmentConstructionsAmountService from '@modules/government-constructions/services/GetGovernmentConstructionsAmountService';
import GetGovernmentConstructionsExpenditureService from '@modules/government-constructions/services/GetGovernmentConstructionsExpenditureService';

cron.schedule('* 1 * * * *', async () => {
  logger.info('Iniciando a busca de obras na api do governo.');

  const constructionLocalization = container.resolve(
    GetGovernmentConstructionsService,
  );
  const constructionLocalizationList = await constructionLocalization.execute();

  const constructionAmount = container.resolve(
    GetGovernmentConstructionsAmountService,
  );
  await constructionAmount.execute(constructionLocalizationList);
});

cron.schedule('* 1 * * * *', async () => {
  logger.info('Iniciando a busca de despesas com obras.');

  const expenditure = container.resolve(
    GetGovernmentConstructionsExpenditureService,
  );
  await expenditure.execute();
});

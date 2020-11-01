import * as cron from 'node-cron';
import { container } from 'tsyringe';

import logger from '@shared/container/providers/Logs';

import GetGovernmentConstructionsService from '@modules/government-constructions/services/GetGovernmentConstructionsService';
import GetGovernmentConstructionsAmountService from '@modules/government-constructions/services/GetGovernmentConstructionsAmountService';
import GetGovernmentConstructionsExpenditureService from '@modules/government-constructions/services/GetGovernmentConstructionsExpenditureService';

cron.schedule('1 * * * * *', () => {
  logger.info('Iniciando a busca de localização de obras.');

  const construction = container.resolve(GetGovernmentConstructionsService);
  construction.execute();
});

cron.schedule('1 * * * * *', () => {
  logger.info('Iniciando a busca de valores de obras.');

  const construction = container.resolve(
    GetGovernmentConstructionsAmountService,
  );
  construction.execute();
});

cron.schedule('1 * * * * *', () => {
  logger.info('Iniciando a busca de despesas com obras.');

  const expenditure = container.resolve(
    GetGovernmentConstructionsExpenditureService,
  );
  expenditure.execute();
});

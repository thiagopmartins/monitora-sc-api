import * as cron from 'node-cron';
import { container } from 'tsyringe';

import logger from '@shared/container/providers/Logs';

import GetGovernanmentConstructionsService from '@modules/government-constructions/services/GetGovernnmentConstructionsService';
import GetGovernnmentConstructionsAmountService from '@modules/government-constructions/services/GetGovernnmentConstructionsAmountService';

cron.schedule('1 * * * * *', () => {
  logger.info('Iniciando a busca de localização de obras.');

  const construction = container.resolve(GetGovernanmentConstructionsService);
  construction.execute();
});

cron.schedule('1 * * * * *', () => {
  logger.info('Iniciando a busca de valores de obras.');

  const construction = container.resolve(
    GetGovernnmentConstructionsAmountService,
  );
  construction.execute();
});

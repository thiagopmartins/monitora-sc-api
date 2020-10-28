import * as cron from 'node-cron';
import { container } from 'tsyringe';

import GetGovernanmentConstructionsService from '@modules/government-constructions/services/GetGovernnmentConstructionsService';
import logger from '@shared/container/providers/Logs';

cron.schedule('1 * * * * *', () => {
  logger.info('Iniciando a busca de localização de obras.');

  const construction = container.resolve(GetGovernanmentConstructionsService);
  construction.execute();
});

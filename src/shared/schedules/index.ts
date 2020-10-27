import * as cron from 'node-cron';
import { container } from 'tsyringe';

import GetGovernanmentConstructionsService from '@modules/government-constructions/services/GetGovernnmentConstructionsService';

cron.schedule('1 * * * * *', () => {
  console.log('INICIANDO A BUSCA NA API DO GOVERNO');

  const construction = container.resolve(GetGovernanmentConstructionsService);
  construction.execute();
});

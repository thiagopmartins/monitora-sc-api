import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IConstructionsLocalizationRepository from '@modules/constructions/repositories/IConstructionsLocalizationRepository';
import ConstructionsLocalizationRepository from '@modules/constructions/infra/mongoose/repositories/ConstructionsLocalizationRepository';
import IGovarnamentConstructionLocalizationProvider from '@modules/constructions/providers/IGovarnamentConstructionLocalizationProvider';
import GovarnamentConstructionsLocalization from '@modules/constructions/infra/http/GovarnamentConstructionsLocalization';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IConstructionsLocalizationRepository>(
  'ConstructionsLocalizationRepository',
  ConstructionsLocalizationRepository,
);

container.registerSingleton<IGovarnamentConstructionLocalizationProvider>(
  'GovarnamentConstructionsLocalization',
  GovarnamentConstructionsLocalization,
);

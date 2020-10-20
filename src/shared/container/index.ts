import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IGovernmentConstructionLocalizationProvider from '@modules/government-constructions/providers/IGovernmentConstructionLocalizationProvider';
import GovernmentConstructionsLocalizationsProvider from '@modules/government-constructions/infra/http/GovernmentConstructionsLocalizationsProvider';
import IGovernmentConstructionsLocalizationsRepository from '@modules/government-constructions/repositories/IGovernmentConstructionsLocalizationsRepository';
import GovernmentConstructionsLocalizationsRepository from '@modules/government-constructions/infra/typeorm/repositories/GovernmentConstructionsLocalizationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IGovernmentConstructionLocalizationProvider>(
  'GovernmentConstructionsLocalizationsProvider',
  GovernmentConstructionsLocalizationsProvider,
);

container.registerSingleton<IGovernmentConstructionsLocalizationsRepository>(
  'GovernmentConstructionsLocalizationsRepository',
  GovernmentConstructionsLocalizationsRepository,
);

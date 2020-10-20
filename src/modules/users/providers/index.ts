import { container } from 'tsyringe';
import BCRyptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCRyptHashProvider);

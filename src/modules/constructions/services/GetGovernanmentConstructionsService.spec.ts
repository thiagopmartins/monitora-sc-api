import AppError from '@shared/errors/AppError';
import FakeGovarnamentConstructionsLocalization from '../providers/fakes/FakeGovarnamentConstructionsLocalization';
import FakeConstructionsLocalizationRepository from '../repositories/fakes/FakeConstructionsLocalizationRepository';
import GetGovernanmentConstructionsService from './GetGovernanmentConstructionsService';

describe('GetGovarnamentConstructionsLocalization', () => {
  it('should be able to create a new construction localization', async () => {
    const fakeConstructionsLocalizationRepository = new FakeConstructionsLocalizationRepository();
    const fakeGovarnamentConstructionsLocalization = new FakeGovarnamentConstructionsLocalization();

    const getGovarnamentConstructionsLocalization = new GetGovernanmentConstructionsService(
      fakeConstructionsLocalizationRepository,
      fakeGovarnamentConstructionsLocalization,
    );

    const user = await getGovarnamentConstructionsLocalization.execute();

    expect(user).toHaveProperty('id');
  });
});

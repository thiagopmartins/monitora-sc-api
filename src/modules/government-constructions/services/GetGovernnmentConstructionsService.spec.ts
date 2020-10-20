import FakeGovarnamentConstructionsLocalization from '../providers/fakes/FakeGovarnamentConstructionsLocalization';
import FakeConstructionsLocalizationRepository from '../repositories/fakes/FakeConstructionsLocalizationRepository';
import GetGovernnmentConstructionsService from './GetGovernnmentConstructionsService';

describe('GetGovernnmentConstructionsService', () => {
  it('should be able to create a new construction localization', async () => {
    const fakeConstructionsLocalizationRepository = new FakeConstructionsLocalizationRepository();
    const fakeGovarnamentConstructionsLocalization = new FakeGovarnamentConstructionsLocalization();

    const getGovernmentConstructionsLocalization = new GetGovernnmentConstructionsService(
      fakeConstructionsLocalizationRepository,
      fakeGovarnamentConstructionsLocalization,
    );

    const user = await getGovernmentConstructionsLocalization.execute();

    expect(user).toHaveProperty('id');
  });
});

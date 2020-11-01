import FakeGovarnamentConstructionsLocalization from '../providers/fakes/FakeGovarnamentConstructionsLocalization';
import FakeConstructionsLocalizationRepository from '../repositories/fakes/FakeConstructionsLocalizationRepository';
import GetGovernnmentConstructionsService from './GetGovernmentConstructionsService';

describe('GetGovernnmentConstructionsService', () => {
  it('should be able to create a new construction localization', async () => {
    const fakeConstructionsLocalizationRepository = new FakeConstructionsLocalizationRepository();
    const fakeGovarnamentConstructionsLocalization = new FakeGovarnamentConstructionsLocalization();

    const getGovernmentConstructionsLocalization = new GetGovernnmentConstructionsService(
      fakeConstructionsLocalizationRepository,
      fakeGovarnamentConstructionsLocalization,
    );

    const create = jest.spyOn(
      fakeConstructionsLocalizationRepository,
      'create',
    );

    await getGovernmentConstructionsLocalization.execute();

    expect(create).toBeCalledWith(
      expect.objectContaining({
        construction_id: expect.any(String),
      }),
    );

    expect(
      fakeConstructionsLocalizationRepository.constructions,
    ).toMatchSnapshot([
      {
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        construction_id: expect.any(String),
        id: expect.any(String),
      },
    ]);
  });

  it('should be able to update if already exists construcion', async () => {
    const fakeConstructionsLocalizationRepository = new FakeConstructionsLocalizationRepository();
    const fakeGovarnamentConstructionsLocalization = new FakeGovarnamentConstructionsLocalization();

    const getGovernmentConstructionsLocalization = new GetGovernnmentConstructionsService(
      fakeConstructionsLocalizationRepository,
      fakeGovarnamentConstructionsLocalization,
    );

    const update = jest.spyOn(
      fakeConstructionsLocalizationRepository,
      'update',
    );

    await getGovernmentConstructionsLocalization.execute();
    await getGovernmentConstructionsLocalization.execute();

    expect(update).toBeCalledWith(
      expect.objectContaining({
        construction_id: expect.any(String),
      }),
    );

    expect(
      fakeConstructionsLocalizationRepository.constructions,
    ).toMatchSnapshot([
      {
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        construction_id: expect.any(String),
        id: expect.any(String),
      },
    ]);
  });

  it('should be not call repository functions if governmentConstructionsLocalizationProvider is undefined', async () => {
    const fakeConstructionsLocalizationRepository = new FakeConstructionsLocalizationRepository();
    const fakeGovarnamentConstructionsLocalization = new FakeGovarnamentConstructionsLocalization();

    const getGovernmentConstructionsLocalization = new GetGovernnmentConstructionsService(
      fakeConstructionsLocalizationRepository,
      fakeGovarnamentConstructionsLocalization,
    );

    jest
      .spyOn(fakeGovarnamentConstructionsLocalization, 'getAll')
      .mockImplementation(() => Promise.resolve(undefined));

    const find = jest.spyOn(
      fakeConstructionsLocalizationRepository,
      'findByConstructionLocalizarionId',
    );

    await getGovernmentConstructionsLocalization.execute();

    expect(find).not.toBeCalled();
  });
});

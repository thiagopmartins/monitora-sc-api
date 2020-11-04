import GovernmentConstructionsLocalizations from '../infra/typeorm/schemas/GovernmentConstructionsLocalizations';
import FakeGovarnamentConstructionsAmount from '../providers/fakes/FakeGovarnamentConstructionsAmount';
import FakeGovarnamentConstructionsLocalization from '../providers/fakes/FakeGovarnamentConstructionsLocalization';
import FakeConstructionsAmountRepository from '../repositories/fakes/FakeConstructionsAmountRepository';
import GetGovernnmentConstructionsAmountService from './GetGovernmentConstructionsAmountService';

describe('GetGovernnmentConstructionsAmountService', () => {
  let fakeConstructionsAmountRepository: FakeConstructionsAmountRepository;
  let fakeGovarnamentConstructionsAmount: FakeGovarnamentConstructionsAmount;
  let getGovernmentConstructionsAmount: GetGovernnmentConstructionsAmountService;
  let fakeGovarnamentConstructionsLocalization: FakeGovarnamentConstructionsLocalization;
  let governmentConstructionsLocalizationList:
    | GovernmentConstructionsLocalizations[]
    | undefined;

  beforeAll(async () => {
    fakeConstructionsAmountRepository = new FakeConstructionsAmountRepository();
    fakeGovarnamentConstructionsAmount = new FakeGovarnamentConstructionsAmount();
    fakeGovarnamentConstructionsLocalization = new FakeGovarnamentConstructionsLocalization();
    getGovernmentConstructionsAmount = new GetGovernnmentConstructionsAmountService(
      fakeConstructionsAmountRepository,
      fakeGovarnamentConstructionsAmount,
    );

    governmentConstructionsLocalizationList = await fakeGovarnamentConstructionsLocalization.getAll();
  });

  it('should be able to create a new construction amount', async () => {
    const create = jest.spyOn(fakeConstructionsAmountRepository, 'create');

    await getGovernmentConstructionsAmount.execute(
      governmentConstructionsLocalizationList,
    );

    expect(create).toBeCalledWith(
      expect.objectContaining({
        construction_amount_id: expect.any(Number),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      }),
    );

    expect(fakeConstructionsAmountRepository.constructions).toMatchSnapshot([
      {
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        construction_amount_id: expect.any(Number),
        id: expect.any(String),
      },
    ]);
  });

  it('should be able to update if already exists construcion', async () => {
    const update = jest.spyOn(fakeConstructionsAmountRepository, 'update');

    await getGovernmentConstructionsAmount.execute(
      governmentConstructionsLocalizationList,
    );
    await getGovernmentConstructionsAmount.execute(
      governmentConstructionsLocalizationList,
    );

    expect(update).toBeCalledWith(
      expect.objectContaining({
        construction_amount_id: expect.any(Number),
      }),
    );

    expect(fakeConstructionsAmountRepository.constructions).toMatchSnapshot([
      {
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        construction_amount_id: expect.any(Number),
        id: expect.any(String),
      },
    ]);
  });
  it('should be not call repository functions if governmentConstructionsAmountProvider is undefined', async () => {
    jest
      .spyOn(fakeGovarnamentConstructionsAmount, 'getAll')
      .mockImplementation(() => Promise.resolve(undefined));

    const find = jest.spyOn(
      fakeConstructionsAmountRepository,
      'findByConstructionAmountId',
    );

    await getGovernmentConstructionsAmount.execute(
      governmentConstructionsLocalizationList,
    );

    expect(find).not.toBeCalled();
  });
});

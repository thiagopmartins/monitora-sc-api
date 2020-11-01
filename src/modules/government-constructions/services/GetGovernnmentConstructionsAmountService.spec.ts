import FakeGovarnamentConstructionsAmount from '../providers/fakes/FakeGovarnamentConstructionsAmount';
import FakeConstructionsAmountRepository from '../repositories/fakes/FakeConstructionsLocalizationRepository copy';
import GetGovernnmentConstructionsAmountService from './GetGovernnmentConstructionsAmountService';

describe('GetGovernnmentConstructionsAmountService', () => {
  let fakeConstructionsAmountRepository: FakeConstructionsAmountRepository;
  let fakeGovarnamentConstructionsAmount: FakeGovarnamentConstructionsAmount;
  let getGovernmentConstructionsLocalization: GetGovernnmentConstructionsAmountService;

  beforeAll(() => {
    fakeConstructionsAmountRepository = new FakeConstructionsAmountRepository();
    fakeGovarnamentConstructionsAmount = new FakeGovarnamentConstructionsAmount();
    getGovernmentConstructionsLocalization = new GetGovernnmentConstructionsAmountService(
      fakeConstructionsAmountRepository,
      fakeGovarnamentConstructionsAmount,
    );
  });

  it('should be able to create a new construction amount', async () => {
    const create = jest.spyOn(fakeConstructionsAmountRepository, 'create');

    await getGovernmentConstructionsLocalization.execute();

    expect(create).toBeCalledWith(
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

  it('should be able to update if already exists construcion', async () => {
    await getGovernmentConstructionsLocalization.execute();

    const update = jest.spyOn(fakeConstructionsAmountRepository, 'update');

    await getGovernmentConstructionsLocalization.execute();
    await getGovernmentConstructionsLocalization.execute();

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

    await getGovernmentConstructionsLocalization.execute();

    expect(find).not.toBeCalled();
  });
});

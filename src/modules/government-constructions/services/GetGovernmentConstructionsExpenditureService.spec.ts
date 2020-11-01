import FakeGovarnamentConstructionsExpenditure from '../providers/fakes/FakeGovarnamentConstructionsExpenditure';
import FakeConstructionsExpenditureRepository from '../repositories/fakes/FakeConstructionsExpenditureRepository';
import GetGovernmentConstructionsExpenditureService from './GetGovernmentConstructionsExpenditureService';

describe('GetGovernmentConstructionsExpenditure', () => {
  let fakeConstructionsExpenditureRepository: FakeConstructionsExpenditureRepository;
  let fakeGovarnamentConstructionsExpenditure: FakeGovarnamentConstructionsExpenditure;
  let getGovernmentConstructionsExpenditure: GetGovernmentConstructionsExpenditureService;

  beforeAll(() => {
    fakeConstructionsExpenditureRepository = new FakeConstructionsExpenditureRepository();
    fakeGovarnamentConstructionsExpenditure = new FakeGovarnamentConstructionsExpenditure();
    getGovernmentConstructionsExpenditure = new GetGovernmentConstructionsExpenditureService(
      fakeConstructionsExpenditureRepository,
      fakeGovarnamentConstructionsExpenditure,
    );
  });

  it('should be able to create a new construction expenditure', async () => {
    const create = jest.spyOn(fakeConstructionsExpenditureRepository, 'create');

    await getGovernmentConstructionsExpenditure.execute();

    expect(create).toBeCalledWith(
      expect.objectContaining({
        statusId: expect.any(Number),
      }),
    );

    fakeConstructionsExpenditureRepository.expenditures.forEach(expenditure => {
      expect(expenditure).toMatchSnapshot({
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        id: expect.any(String),
      });
    });
  });

  it('should be able to update if already exists construcion expenditure', async () => {
    await getGovernmentConstructionsExpenditure.execute();

    const update = jest.spyOn(fakeConstructionsExpenditureRepository, 'update');

    await getGovernmentConstructionsExpenditure.execute();
    await getGovernmentConstructionsExpenditure.execute();

    expect(update).toBeCalledWith(
      expect.objectContaining({
        statusId: expect.any(Number),
      }),
    );

    fakeConstructionsExpenditureRepository.expenditures.forEach(expenditure => {
      expect(expenditure).toMatchSnapshot({
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
        id: expect.any(String),
      });
    });
  });

  it('should be not call repository functions if governmentConstructionsAmountProvider is undefined', async () => {
    jest
      .spyOn(fakeGovarnamentConstructionsExpenditure, 'getAll')
      .mockImplementation(() => Promise.resolve(undefined));

    const find = jest.spyOn(
      fakeConstructionsExpenditureRepository,
      'findByConstructionStatusId',
    );

    await getGovernmentConstructionsExpenditure.execute();

    expect(find).not.toBeCalled();
  });
});

import ICreateConstructionsAmountDTO from '../dtos/ICreateConstructionsAmountDTO';
import FakeConstructionsAmountRepository from '../repositories/fakes/FakeConstructionsAmountRepository';
import GetAllLocallyStoredGovernmentConstructions from './GetAllLocallyStoredGovernmentConstructions';

describe('GetAllLocallyStoredGovernmentConstructions', () => {
  let fakeConstructionsAmountRepository: FakeConstructionsAmountRepository;

  let getAllLocallyStoredGovernmentConstructions: GetAllLocallyStoredGovernmentConstructions;

  const createConstructionsAmountDTO: ICreateConstructionsAmountDTO[] = [
    {
      construction_amount_id: 7272,
      description: 'REFORMA NAS INSTALAÇÕES ELÉTRICAS DA EEB IRMÃ IRENE',
      year: 2020,
      number: '704',
      area: 'Educação',
      status: 'Concluído',
      amount: 279908.7,
      cityId: 8305,
      cityDescription: 'Santa Cecília',
      peExecuted: 0,
      contracts: [
        {
          id: 1031440,
          description: '',
          number: 0,
        },
      ],
      latitude: -26.96225,
      longitude: -50.4238056,
    },
    {
      construction_amount_id: 7272,
      description: 'REFORMA NAS INSTALAÇÕES ELÉTRICAS DA EEB IRMÃ IRENE',
      year: 2019,
      number: '704',
      area: 'Educação',
      status: 'A iniciar',
      amount: 279908.7,
      cityId: 8305,
      cityDescription: 'Santa Cecília',
      peExecuted: 0,
      contracts: [
        {
          id: 1031440,
          description: '',
          number: 0,
        },
      ],
      latitude: -26.96225,
      longitude: -50.4238056,
    },
  ];

  beforeAll(async () => {
    fakeConstructionsAmountRepository = new FakeConstructionsAmountRepository();
    getAllLocallyStoredGovernmentConstructions = new GetAllLocallyStoredGovernmentConstructions(
      fakeConstructionsAmountRepository,
    );
    await fakeConstructionsAmountRepository.create(
      createConstructionsAmountDTO[0],
    );

    await fakeConstructionsAmountRepository.create(
      createConstructionsAmountDTO[1],
    );
  });

  it('should be able to get all constructions on locally stored if it does not contain a filter in call', async () => {
    const result = await getAllLocallyStoredGovernmentConstructions.execute({
      year: undefined,
      status: [],
    });

    expect(result).toHaveLength(2);

    expect(result).toMatchObject(createConstructionsAmountDTO);
  });

  it('should be able to get all constructions on locally stored if it contain filter year in call', async () => {
    const result = await getAllLocallyStoredGovernmentConstructions.execute({
      year: {
        initial: 2019,
        finish: 2019,
      },
      status: [],
    });

    expect(result).toHaveLength(1);

    expect(result).toMatchObject(
      createConstructionsAmountDTO.filter(x => x.year === 2019),
    );
  });

  it('should be able to get all constructions on locally stored if it contain filter status in call', async () => {
    const result = await getAllLocallyStoredGovernmentConstructions.execute({
      year: undefined,
      status: ['Concluído'],
    });

    expect(result).toHaveLength(1);

    expect(result).toMatchObject(
      createConstructionsAmountDTO.filter(x => x.status === 'Concluído'),
    );
  });

  it('should be able to get all constructions on locally stored if it contain filter status and year in call', async () => {
    const result = await getAllLocallyStoredGovernmentConstructions.execute({
      year: {
        finish: 2019,
        initial: 2019,
      },
      status: ['Concluído'],
    });

    expect(result).toHaveLength(0);
  });
});

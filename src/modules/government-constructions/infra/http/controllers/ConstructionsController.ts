import GetAllLocallyStoredGovernmentConstructions from '@modules/government-constructions/services/GetAllLocallyStoredGovernmentConstructions';
import { Request, Response } from 'express';
import qs from 'qs';
import { container } from 'tsyringe';

class ConstructionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { initial, finish, status } = request.query;

    const getAllLocallyStoredGovernmentConstructions = container.resolve(
      GetAllLocallyStoredGovernmentConstructions,
    );

    const constructions = await getAllLocallyStoredGovernmentConstructions.execute(
      {
        year: {
          initial: +initial,
          finish: +finish,
        },
        status: status?.toLocaleString().split(';'),
      },
    );

    return response.json(constructions);
  }
}

export default ConstructionsController;

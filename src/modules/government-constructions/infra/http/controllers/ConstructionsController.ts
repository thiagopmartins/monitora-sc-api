import GetAllLocallyStoredGovernmentConstructions from '@modules/government-constructions/services/GetAllLocallyStoredGovernmentConstructions';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ConstructionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { year, status } = request.body;

    const getAllLocallyStoredGovernmentConstructions = container.resolve(
      GetAllLocallyStoredGovernmentConstructions,
    );

    const constructions = await getAllLocallyStoredGovernmentConstructions.execute(
      {
        year,
        status,
      },
    );

    return response.json(constructions);
  }
}

export default ConstructionsController;

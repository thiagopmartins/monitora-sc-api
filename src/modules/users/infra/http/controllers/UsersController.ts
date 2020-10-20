import GetGovernanmentConstructionsService from '@modules/constructions/services/GetGovernanmentConstructionsService';
import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const construction = container.resolve(GetGovernanmentConstructionsService);

    construction.execute();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
  index(request: Request, response: Response) {
    return response.json({
      message: 'Success! User logged in.',
      userID: request.userId,
    });
  }

  async store(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;

    // Verifica se o e-mail ja esta cadastrado no BD
    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return response.status(409).json({ message: 'E-mail already in use' });
    }

    const user = await repository.create({ email, password });
    await repository.save(user);

    return response.json(user);
  }
}

export default new UserController();

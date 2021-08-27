import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

// Interface para salvar os dados do usuário que serão retornados após autenticação
interface UserView {
  id: string;
  email: string;
  password?: string;
}

class AuthController {
  async authenticate(request: Request, response: Response) {
    const repository = getRepository(User);
    const { email, password } = request.body;

    // Verifica se o e-mail esta cadastrado no BD
    const user = await repository.findOne({ where: { email } });

    // Caso não exista é retornada a falha de autenticação
    if (!user) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    // Validação da senha
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Caso a senha esteja errada, retorna falha na autenticação
    if (!isValidPassword) {
      return response.status(401).json({ message: 'Invalid password' });
    }

    // Geração do token jwt.sign(Payload - identificação, secret, validade do token)
    const token = jwt.sign({ id: user.id }, 'secretQueNaoDeveEstarAqui', {
      expiresIn: '1d',
    });

    // Associação do usuário a uma interface onde o password é opcional
    const userView: UserView = user;

    // Remover o password do objeto user para que o mesmo nao seja retornado
    delete userView.password;

    return response.json({
      user: userView,
      token,
    });
  }
}

export default new AuthController();

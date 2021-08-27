import { Request, Response, NextFunction, Application } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  // Caso nao tenha a autorizacao no header, retorna unauthorized
  if (!authorization) {
    return response.status(401).json({ message: 'Unauthorized' });
  }

  // Removendo o Bearer do token e removendo os espaços
  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'secretQueNaoDeveEstarAqui');
    const { id } = data as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    return response.status(401).json({ message: 'Unauthorized' });
  }
}

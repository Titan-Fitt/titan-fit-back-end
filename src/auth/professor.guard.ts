import {

  CanActivate,

  ExecutionContext,

  Injectable,

  UnauthorizedException,

} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()

export class ProfessorGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    if (!authorization) {

      throw new UnauthorizedException('Token não informado');

    }

    const [tipo, token] = authorization.split(' ');

    if (tipo !== 'Bearer' || !token) {

      throw new UnauthorizedException('Token inválido');

    }

    try {

      const payload = this.jwtService.verify(token);

      if (payload.tipo !== 'professor') {

        throw new UnauthorizedException(

          'Acesso permitido somente para professores',

        );

      }

      request.user = payload;

      return true;

    } catch (error) {

      if (error instanceof UnauthorizedException) {

        throw error;

      }

      throw new UnauthorizedException('Token inválido ou expirado');

    }

  }

}
 

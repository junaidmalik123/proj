import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
 
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      console.log("&&&&&&&&&&&")
      console.log(request)
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        console.log("i am here _______________")
        throw new UnauthorizedException();
      }
      try {
        console.log("i am here ___################################____________")
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWTKEY 
          }
        );
      
        request['user'] = payload;
        console.log("gfzsdfghjk",request.user)
      } catch {
        console.log("i am here _____fsfsggsg__________")
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {request.header
      console.log(request.body)
      console.log(request.headers.authorization)
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
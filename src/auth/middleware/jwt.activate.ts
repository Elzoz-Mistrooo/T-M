// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers['authorization']?.split(' ')[1];

//     if (!token) {
//       throw new UnauthorizedException('No token provided.');
//     }

//     try {
//       const decoded = this.jwtService.verify(token, { secret: process.env.SECRET });
//       request.user = decoded;
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }

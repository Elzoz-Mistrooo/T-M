import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user: any; // Changed from optional to required
    }
  }
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new HttpException('Bearer token is required', HttpStatus.UNAUTHORIZED);
    }

    try {
      // Make sure to handle the secret correctly
      if (!process.env.SECRET) {
        throw new HttpException('JWT secret is not configured', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
    } catch (error) {
      throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}

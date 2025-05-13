import { Controller, Post, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jtwt-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Post('verify-token')
  verifyToken(@Request() req) {
    console.log('Requête reçue avec JWT :', req.user);
  
    if (!req.user) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  
    const { email, role, userId } = req.user;
    return { 
      email: req.user.email, 
      role: req.user.role, 
      userId : req.user.id
    };
  }
  
}

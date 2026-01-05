import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../config/environments/envs';
import { JwtStrategy } from './strategie/jwt.strategy';
import { MailModule } from '../mail/mail.module';



@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    PassportModule.register({

      defaultStrategy: 'jwt'
    }),

    

    JwtModule.register({
      secret: envs.jwtSecret,
  
      signOptions: {
        expiresIn: '2h'
      }
    }),
    MailModule

  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/environments/envs';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    PassportModule.register({

      defaultStrategy: 'jwt'
    }),

    JwtModule.register({
      secret: envs.jwtSecret,
      global: true,
      signOptions: {
        expiresIn: '2h'
      }
    })

  ]
})
export class AuthModule { }


import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interface';
import { JwtService } from '@nestjs/jwt';
import { Argon2Plugin } from '../config/plugins/atgon_2.plugin';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async createUser(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({

        ...userData,
        password: (await Argon2Plugin.hash(password))
      });

      await this.userRepository.save(user);

      delete user.password;

      return {
        ...user,
        token: this.getJwToken({ id: user.id })
      };

    } catch (error) {
      this.handleDbErrors(error);
    }

  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, createdAt: true, fullName: true, }
    });

    if (!user) {
      throw new UnauthorizedException('Creadentials are not valid (email)');
    }
    if (!(await Argon2Plugin.verify(user.password, password))) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    return {
      ...user,
      token: this.getJwToken({ id: user.id })
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwToken({ id: user.id })
    };
  }


  private getJwToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Error on DB')
  }


}

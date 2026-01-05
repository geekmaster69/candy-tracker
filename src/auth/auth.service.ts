import { DeleteUserDto } from './dto/delete_user.dto';

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserDto, LoginUserDto, RecoveryPasswordDto } from './dto';
import { JwtPayload } from './interface';
import { JwtService } from '@nestjs/jwt';
import { Argon2Plugin } from '../config/plugins/atgon_2.plugin';
import { MailService } from '../mail/mail.service';
import { envs } from '../config/environments/envs';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

  async deleteAccount(deleteUserDto: DeleteUserDto) {

    const user = await this.userRepository.findOne({
      where: {
        email: deleteUserDto.email
      }
    })

    if (!user) throw new NotFoundException('Error al borrar');


    await this.userRepository.remove(user);
    return 'Borrado con exito';
  }

  async recoveryPassword({ email }: RecoveryPasswordDto) {

    const user = await this.userRepository.findOne({ where: { email }, select: { id: true } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const token = this.getJwToken({ id: user.id });

    const link = `${envs.webPage}/recovery/${token}`;


    const html = this.customHtml('Recuperacion de contraseña', 'Utilice el boton de abajo para recuperar su contraseña, este tiene una duracion de 2 horas', link, 'Recuperar');

    await this.mailService.sendMail({
      to: email,
      subject: 'Bienvenido',
      html: html,

    });

    return 'correo enviado';
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('Error on DB')
  }


  private customHtml = (title: string, content: string, link: string, titleButton: string) => {


    return `
                <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>"${title}"</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }
        .footer {
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>"${title}"</h1>
        </div>
        <div class="content">
            <p>"${content}"</p>
            <img src="https://res.cloudinary.com/dq4y5absg/image/upload/v1767567301/candyTracker/Copilot_20250628_205218-removebg-preview_u29k1j.png" alt="Imagen de Confirmación">
            <p><a href="${link}" style="background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">${titleButton}</a></p>
        </div>
        <div class="footer">
            <p>© 2026 Albeitarray. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>    
        `;
  }


}

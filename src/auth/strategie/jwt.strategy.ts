
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { envs } from "src/config/environments/envs";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: envs.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate({ id }: JwtPayload): Promise<User> {

        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('Token not valid');
        }

        // if (!user.isActive) {
        //     throw new UnauthorizedException('User is inactive, talk with an admin');
        // }

        return user;
    }
}
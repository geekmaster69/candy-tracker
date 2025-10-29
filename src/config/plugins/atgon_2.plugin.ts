
import * as argon2 from 'argon2';


export class Argon2Plugin {
    static async hash(password: string): Promise<string> {

        return await argon2.hash(password);
    }

    static async verify(hazingPassword: string, password: string): Promise<boolean> {
        return await argon2.verify(hazingPassword, password);
    }
}
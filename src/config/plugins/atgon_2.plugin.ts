
import argon2 from 'argon2';


export class Argon2Plugin {
    static async hash(password: string): Promise<string> {
        return argon2.hash(password);
    }

    static async verify(hazingPassword: string, password: string): Promise<boolean> {
        return argon2.verify(hazingPassword, password);
    }
}
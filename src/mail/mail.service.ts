import { Injectable, Logger } from '@nestjs/common';


import * as nodemailer from 'nodemailer';
import { envs } from '../config/environments/envs';


@Injectable()
export class MailService {

  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: envs.mailerService,

      auth: {
        user: envs.mailerEmail,
        pass: envs.mailerSecretKey,
      },
    });
  }

  async sendMail(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }) {
    try {
      return await this.transporter.sendMail({
        from: envs.mailerEmail,
        ...options,
      });
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw error;
    }
  }



}

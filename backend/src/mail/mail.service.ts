import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    private transporter;

    constructor(private configService: ConfigService) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.get('EMAIL_USER'),
          pass: this.configService.get('EMAIL_PASS'),
        },
      });
  }

  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
    from: this.configService.get('EMAIL_USER'),
      to,
      subject,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

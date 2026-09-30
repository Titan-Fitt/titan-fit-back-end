import { Injectable } from '@nestjs/common';import * as nodemailer from 'nodemailer';
@Injectable()export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async enviarTokenRecuperacao(
    email: string,
    token: string,
  ) {
    await this.transporter.sendMail({
      from: `"Titan Fit" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperação de senha - Titan Fit',
      html: `
        <h2>Recuperação de senha</h2>

        <p>Você solicitou a recuperação da sua senha na Titan Fit.</p>

        <p>Seu token de recuperação é:</p>

        <h3>${token}</h3>

        <p>Esse token é válido por 30 minutos.</p>

        <p>Se você não solicitou a recuperação de senha, ignore este e-mail.</p>
      `,
    });
  }
}

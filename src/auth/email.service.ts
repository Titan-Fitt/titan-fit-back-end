import { Injectable, InternalServerErrorException } from '@nestjs/common';import { Resend } from 'resend';
@Injectable()export class EmailService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async enviarTokenRecuperacao(
    email: string,
    token: string,
  ) {
    const { data, error } = await this.resend.emails.send({
      from: 'Titan Fit <onboarding@resend.dev>',
      to: [email],
      subject: 'Recuperação de senha - Titan Fit',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Recuperação de senha</h2>

          <p>Você solicitou a recuperação da sua senha na Titan Fit.</p>

          <p>Seu token de recuperação é:</p>

          <div style="
            background: #f3f3f3;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
          ">
            ${token}          </div>

          <p>Esse token é válido por 30 minutos.</p>

          <p>
            Se você não solicitou a recuperação de senha,
            ignore este e-mail.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new InternalServerErrorException(
        'Não foi possível enviar o e-mail de recuperação',
      );
    }

    return data;
  }
}

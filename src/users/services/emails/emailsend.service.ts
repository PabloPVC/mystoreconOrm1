import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as https from 'https';
import * as fs from 'fs';

// Crear un agente HTTPS personalizado que desactive la verificación SSL
const agent = new https.Agent({
  rejectUnauthorized: false,
});

@Injectable()
export class EmailsendService {
  private transporter;
  private url;

  constructor() {
    this.url = 'src/users/services/emails/templates';
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'privadeneira999@gmail.com',
        pass: 'sgeb laxg sogz txbr',
      },
      tls: {
        rejectUnauthorized: false,
      },
      agent: agent,
    });
  }

  async sendForgotPasswordMail(email: string, token: string) {
    const url = 'http://localhost:4000';
    const urlToken = `${url}/users/update-password?token=${token}`;
    console.log(urlToken);

    const templateHtml = fs.readFileSync(
      this.url + '/correo-envio-token.html',
      'utf8',
    );
    const template = handlebars.compile(templateHtml);
    const html = template({
      email: email,
      url: urlToken,
    });

    const mailOptions = {
      from: 'my House.com',
      to: email,
      subject: 'Restablecimiento de contraseña',
      html: html,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendForgotPasswordMailMovil(email: string, codigoSegure: string) {
    let templateHtml = '';
    try {
      templateHtml = fs.readFileSync(
        this.url + '/correo-envio-codigo.html',
        'utf8',
      );
    } catch (error) {
      throw new HttpException(
        `Error no se encontró la plantilla del correo: $error`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const template = handlebars.compile(templateHtml);
    const html = template({
      email: email,
      codigoSegure: codigoSegure,
    });

    const mailOptions = {
      from: 'my House.com',
      to: email,
      subject: 'Restablecimiento de contraseña',
      html: html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      if (info.messageId === undefined) {
        throw new HttpException(
          'Error correo no Enviado: ',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        statusCode: 200,
        data: 'Correo enviado correctamente',
      };
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      return {
        statusCode: 500,
        data: 'Error al enviar el correo',
      };
    }
  }
}

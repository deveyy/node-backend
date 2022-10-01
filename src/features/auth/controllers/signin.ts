import { Request, Response } from 'express';
import { config } from '@root/config';
import JWT from 'jsonwebtoken';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { authService } from '@service/db/auth.service';
import { loginSchema } from '@auth/schemas/signin';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { BadRequestError } from '@global/helpers/error-handler';
import { userService } from '@service/db/user.service';
import { IResetPasswordParams, IUserDocument } from '@user/interfaces/user.interface';

import { emailQueue } from '@service/queues/email.queue';

// test reset develop local email fake-email
//import { forgotPasswordTemplate } from '@service/emails/templates/forgot-password/forgot-password-template';
import moment from 'moment';
import publicIP from 'ip';
import { mailTransport } from '@service/emails/mail.transport';
import { resetPasswordTemplate } from '@service/emails/templates/reset-password/reset-password-template';

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IAuthDocument = await authService.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    const user: IUserDocument = await userService.getUserByAuthId(`${existingUser._id}`);
    const userJwt: string = JWT.sign(
      {
        userId: user._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor
      },
      config.JWT_TOKEN!
    );
    // test send email
      await mailTransport.sendEmail('blanca.hahn@ethereal.email', 'Testing development email', 'This is a test email to show development');
    // test email with password reset
      const templateParams: IResetPasswordParams = {
        username: existingUser.username!,
        email: existingUser.email!,
        ipaddress: publicIP.address(),
        date: moment().format('DD/MM/YYYY HH:mm')
      };
     // const resetLink = `${config.CLIENT_URL}/reset-password?token=321515348343535`;
     // const template: string = forgotPasswordTemplate.passwordResetTemplate(existingUser.username!, resetLink);
     const template: string = resetPasswordTemplate.passwordResetConfirmationTemplate(templateParams);
      emailQueue.addEmailJob('forgotPasswordEmail', { template, receiverEmail: 'blanca.hahn@ethereal.email', subject: 'Password reset successfully'});


    req.session = { jwt: userJwt };
    const userDocument: IUserDocument = {
      ...user,
      authId: existingUser!._id,
      username: existingUser!.username,
      email: existingUser!.email,
      avatarColor: existingUser!.avatarColor,
      uId: existingUser!.uId,
      createdAt: existingUser!.createdAt
    } as IUserDocument;
    res.status(HTTP_STATUS.OK).json({ message: 'User login successfully', user: userDocument, token: userJwt });
  }
}

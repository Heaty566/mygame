import * as supertest from 'supertest';
import 'jest-ts-auto-mock';
import { INestApplication } from '@nestjs/common';
import { createMock } from 'ts-auto-mock';
import { Request, Response } from 'express';

//* Internal import
import { fakeUser } from '../../../test/fakeEntity';
import { UserRepository } from '../../user/entities/user.repository';
import { initTestModule } from '../../../test/initTest';
import { RegisterUserDTO } from '../dto/register.dto';
import { LoginUserDTO } from '../dto/login.dto';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { EmailForChangePasswordDTO } from '../dto/emailForChangePassword.dto';
import { ChangePasswordDTO } from '../dto/changePassword.dto';

describe('AuthController', () => {
      let app: INestApplication;
      let userRepository: UserRepository;
      let authService: AuthService;
      let authController: AuthController;
      beforeAll(async () => {
            const { getApp, module } = await initTestModule();
            app = getApp;

            userRepository = module.get<UserRepository>(UserRepository);
            authService = module.get<AuthService>(AuthService);
            authController = module.get<AuthController>(AuthController);
      });

      describe('resetPassword', () => {
            let user = fakeUser();
            let redisKey: string;
            let body: ChangePasswordDTO;
            beforeEach(async () => {
                  user.email = 'heaty566@gmail.com';
                  await authService.registerUser(user);
                  redisKey = await authService.createOTPRedisKey(user, 2);
                  body = {
                        newPassword: 'Password123',
                        confirmNewPassword: 'Password123',
                  };
            });

            it('Pass', async () => {
                  let user = await authController.resetPassword(redisKey, body);
                  const isMatch = await authService.comparePassword(body.newPassword, user.password);
                  expect(isMatch).toBeTruthy();
            });
      });

      describe('sendOTPMail', () => {
            const user = fakeUser();
            beforeEach(async () => {
                  user.email = 'heaty566@gmail.com';
                  await authService.registerUser(user);
            });
            it('Pass', async () => {
                  let body: EmailForChangePasswordDTO = { email: 'heaty566@gmail.com' };
                  let res = await authController.sendOTPMail(body);
                  expect(res.isSent).toBeTruthy();
            });

            it('Failed(Email not found)', async () => {
                  let body: EmailForChangePasswordDTO = { email: 'heaty5@gmail.com' };
                  try {
                        await authController.sendOTPMail(body);
                  } catch (err) {
                        expect(err).toBeDefined();
                  }
            });

            it('Failed(Not send)', async () => {
                  user.email = 'heaty566';
                  await authService.registerUser(user);

                  let body: EmailForChangePasswordDTO = { email: 'heaty566' };
                  try {
                        await authController.sendOTPMail(body);
                  } catch (err) {
                        expect(err).toBeDefined();
                  }
            });
      });

      describe('googleAuth | facebookAuth | githubAuth', () => {
            it('googleAuth', async () => {
                  const res = await authController.googleAuth();
                  expect(res).toBeUndefined();
            });
            it('facebookAuth', async () => {
                  const res = await authController.facebookAuth();
                  expect(res).toBeUndefined();
            });
            it('githubAuth', async () => {
                  const res = await authController.githubAuth();
                  expect(res).toBeUndefined();
            });
      });

      describe('googleAuthRedirect | facebookAuthRedirect | githubAuthRedirect', () => {
            let req: Request;
            let res: Response;

            beforeEach(() => {
                  req = createMock<Request>();
                  req.user = fakeUser();
                  res = createMock<Response>();
                  res.cookie = jest.fn().mockReturnValue({
                        redirect: (url) => url,
                  });
            });

            it('googleAuthRedirect', async () => {
                  const output = await authController.googleAuthRedirect(req, res);

                  expect(output).toBe(process.env.CLIENT_URL);
            });
            it('facebookAuthRedirect', async () => {
                  const output = await authController.facebookAuthRedirect(req, res);

                  expect(output).toBe(process.env.CLIENT_URL);
            });
            it('githubAuthRedirect', async () => {
                  const output = await authController.githubAuthRedirect(req, res);

                  expect(output).toBe(process.env.CLIENT_URL);
            });
      });

      describe('POST /register', () => {
            let createUserData: RegisterUserDTO;
            const reqApi = (input: RegisterUserDTO) => supertest(app.getHttpServer()).post('/api/auth/register').send(input);

            beforeEach(() => {
                  const getUser = fakeUser();
                  createUserData = {
                        name: getUser.name,
                        username: getUser.username,
                        password: getUser.password,
                        confirmPassword: getUser.password,
                  };
            });
            it('Pass', async () => {
                  const res = await reqApi(createUserData);

                  const token = res.headers['set-cookie'].join('');
                  expect(token).toContain('re-token');
            });

            it('Failed (username is taken)', async () => {
                  await reqApi(createUserData);
                  const res = await reqApi(createUserData);
                  expect(res.status).toBe(400);
            });

            it('Failed (confirmPassword does not match)', async () => {
                  createUserData.confirmPassword = '12345678';
                  const res = await reqApi(createUserData);

                  expect(res.status).toBe(400);
            });
      });

      describe('POST /login', () => {
            let loginUserData: LoginUserDTO;
            const reqApi = (input: LoginUserDTO) => supertest(app.getHttpServer()).post('/api/auth/login').send(input);

            beforeEach(async () => {
                  const getUser = fakeUser();
                  loginUserData = {
                        username: getUser.username,
                        password: getUser.password,
                  };
                  getUser.password = await authService.hash(getUser.password);
                  await authService.registerUser(getUser);
            });

            it('Pass', async () => {
                  const res = await reqApi(loginUserData);

                  const token = res.headers['set-cookie'].join('');
                  expect(token).toContain('re-token');
            });

            it('Failed (username is not correct)', async () => {
                  loginUserData.username = 'update';
                  const res = await reqApi(loginUserData);
                  expect(res.status).toBe(400);
            });

            it('Failed (password is not correct)', async () => {
                  loginUserData.password = '123AABBDASD';
                  const res = await reqApi(loginUserData);
                  expect(res.status).toBe(400);
            });
      });

      afterAll(async () => {
            await userRepository.clear();
            await app.close();
      });
});

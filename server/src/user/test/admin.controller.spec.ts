import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';

import { UserRepository } from '../entities/user.repository';
import { UserRole } from '../entities/user.userRole.enum';
import { initTestModule } from '../../../test/initTest';
import { fakeData } from '../../../test/fakeData';
import User from '../entities/user.entity';

describe('AdminController', () => {
      let app: INestApplication;
      let userRepository: UserRepository;
      let cookieData: Array<string>;
      let UserDb: User;

      beforeAll(async () => {
            const { getApp, module, adminCookie, getUser } = await initTestModule();
            app = getApp;
            UserDb = getUser;
            userRepository = module.get<UserRepository>(UserRepository);
            cookieData = adminCookie;
      });

      describe('GET api/admin/users', () => {
            const reqApi = (cookie) => supertest(app.getHttpServer()).get(`/api/admin/users`).set({ cookie }).send();

            it('Pass get all user', async () => {
                  const res = await reqApi(cookieData);

                  expect(res.body.data.length).toBeGreaterThanOrEqual(1);
            });
      });
      describe('PUT api/admin/user-admin/:id', () => {
            const reqApi = (cookie, userId: string) => supertest(app.getHttpServer()).put(`/api/admin/user-admin/${userId}`).set({ cookie }).send();

            it('Pass to be ADMIN', async () => {
                  await reqApi(cookieData, String(UserDb._id));

                  const getUser = await userRepository.findOneByField('_id', UserDb._id);
                  expect(getUser.role).toBe(UserRole.ADMIN);
            });
            it('Pass to be USER', async () => {
                  await reqApi(cookieData, String(UserDb._id));

                  const getUser = await userRepository.findOneByField('_id', UserDb._id);
                  expect(getUser.role).toBe(UserRole.USER);
            });
            it('Failed not found', async () => {
                  const res = await reqApi(cookieData, fakeData(50));
                  expect(res.status).toBe(400);
            });
      });
      describe('PUT /user-status/:id', () => {
            const reqApi = (cookie, userId: string) => supertest(app.getHttpServer()).put(`/api/admin/user-status/${userId}`).set({ cookie }).send();

            it('Pass to be false', async () => {
                  await reqApi(cookieData, String(UserDb._id));

                  const getUser = await userRepository.findOneByField('_id', UserDb._id);
                  expect(getUser.isDisabled).toBeTruthy();
            });
            it('Pass to be true', async () => {
                  await reqApi(cookieData, String(UserDb._id));

                  const getUser = await userRepository.findOneByField('_id', UserDb._id);
                  expect(getUser.isDisabled).toBeFalsy();
            });

            it('Failed not found', async () => {
                  const res = await reqApi(cookieData, fakeData(50));
                  expect(res.status).toBe(400);
            });
      });

      afterAll(async () => {
            await userRepository.clear();
            await app.close();
      });
});

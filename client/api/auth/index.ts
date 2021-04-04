import http from '..';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosStatic } from 'axios';
//* Import

import {
    UserLoginDto,
    UserRegisterDto,
    ForgotPasswordEmailDto,
    ForgotPasswordUpdateDto,
} from './dto';
import { IApiResponse } from '../../store/api/interface';

class AuthApi {
    constructor(private readonly apiCall: AxiosStatic) {
        apiCall.defaults.baseURL = `${process.env.SERVER_URL}/auth`;
    }

    loginUser = createAsyncThunk<null, UserLoginDto>('loginUser', async (input) => {
        await this.apiCall.post<IApiResponse<null>>('/login', input);
        return null;
    });

    registerUser = createAsyncThunk<null, UserRegisterDto>('registerUser', async (input) => {
        await this.apiCall.post<IApiResponse<null>>('/register', input);
        return null;
    });

    forgotPasswordCreate = createAsyncThunk<IApiResponse<void>, ForgotPasswordEmailDto>(
        'forgotPasswordCreate',
        async (input) => {
            const res = await this.apiCall.post<IApiResponse<void>>('/otp-email', input);
            return res.data;
        },
    );

    forgotPasswordUpdate = createAsyncThunk<IApiResponse<void>, ForgotPasswordUpdateDto>(
        'forgotPasswordUpdate',
        async (input) => {
            const res = await this.apiCall.put<IApiResponse<void>>('/reset-password', input);
            return res.data;
        },
    );
}

export default new AuthApi(http);

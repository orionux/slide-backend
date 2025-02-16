import axios, { AxiosResponse } from 'axios';
import { ApiConfig, LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from 'src/types/OnboardingApi';

const apiURL =process.env.NEXT_PUBLIC_API_URL;

export async function loginUserService(data: LoginUserRequest, config?: ApiConfig): Promise<AxiosResponse<LoginUserResponse>> {

  return await axios.post(apiURL + 'api/login', data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers,
    },
  });
}

export async function registerUserService(data: RegisterUserRequest, config?: ApiConfig): Promise<AxiosResponse<RegisterUserResponse>> {
  
  return await axios.post(apiURL + 'api/register', data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers,
    },
  });
}
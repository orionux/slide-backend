import axios, { AxiosResponse } from 'axios';
import { ApiConfig, LoginUserRequest, LoginUserResponse } from 'src/types/OnboardingApi';

const metadataServiceUrl = 'https://orionux.xyz/sites/slide-backend/';

export async function loginUserService(data: LoginUserRequest, config?: ApiConfig): Promise<AxiosResponse<LoginUserResponse>> {

  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('type', data.type);

  return await axios.post(metadataServiceUrl + 'api/login', formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers,
    },
  });
}
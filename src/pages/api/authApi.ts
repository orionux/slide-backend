
import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { loginUserService } from 'src/services/authService';
import { ApiResponse, LoginUserRequest, LoginUserResponse } from 'src/types/OnboardingApi';


export const loginUser = async (data: LoginUserRequest, config?: any): Promise<ApiResponse<LoginUserResponse>> => {
    try {
      const response = await loginUserService(encryptRequest(data), config);
      if (response?.data?.status === 'success') {
        return {
          responseType: 'success',
          output: decryptResponse(response.data),
        };
      } else {
        return { responseType: 'fail', output: response.data };
      }
    } catch (error) {
      return { responseType: 'error', output: error };
    }
  };
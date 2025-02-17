
import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { loginUserService, registerUserService } from 'src/services/authService';
import { ApiResponse, LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from 'src/types/OnboardingApi';


export const loginUser = async (data: LoginUserRequest, config?: any): Promise<ApiResponse<LoginUserResponse>> => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      // formData.append('type', data.type);

      const response = await loginUserService(encryptRequest(formData), config);
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


export const RegisterUser = async (data: RegisterUserRequest, config?: any): Promise<ApiResponse<RegisterUserResponse>> => {

  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone_no', data.phone_no);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);

    // debugggg
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    const response = await registerUserService(encryptRequest(formData), config);
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
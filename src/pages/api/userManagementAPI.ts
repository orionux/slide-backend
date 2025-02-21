import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { getCustomers, updateCustomerService } from 'src/services/userManagementService';
import { ApiResponse } from 'src/types/OnboardingApi';
import { CommonResponse, GetCustomersResponse } from 'src/types/UserManagementAPI';



export const getAllCustomers = async (config?: any): Promise<ApiResponse<GetCustomersResponse>> => {

  try {
    const response = await getCustomers(config);
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


// export const updateCustomer = async (config?: any , data?: any): Promise<ApiResponse<CommonResponse>> => {

//   try {
//     const response = await updateCustomerApi(config , data);
//     if (response?.data?.status === 'success') {
//       return {
//         responseType: 'success',
//         output: decryptResponse(response.data),
//       };
//     } else {
//       return { responseType: 'fail', output: response.data };
//     }
//   } catch (error) {
//     return { responseType: 'error', output: error };
//   }
// };


export const updateCustomerApi = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  
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
    const userId = data.userId

    const response = await updateCustomerService(encryptRequest(formData),config,userId);
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
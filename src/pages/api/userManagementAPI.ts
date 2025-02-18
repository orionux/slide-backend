import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { getCustomers } from 'src/services/userManagementService';
import { ApiResponse } from 'src/types/OnboardingApi';
import { GetCustomersResponse } from 'src/types/UserManagementAPI';



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
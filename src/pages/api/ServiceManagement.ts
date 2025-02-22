import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { getServicesService } from 'src/services/ServiceManagementService';
import { ApiResponse } from 'src/types/OnboardingApi';
import { GetServicesResponse } from 'src/types/ServiceManagementAPI';



export const getAllServices = async (config?: any): Promise<ApiResponse<GetServicesResponse>> => {

    try {
      const response = await getServicesService(config);
      // if (response?.data?.status === 'success') {
      if (response) {
        return {
          responseType: 'success',
          output: decryptResponse(response),
        };
      } else {
        return { responseType: 'fail', output: response };
      }
    } catch (error) {
      return { responseType: 'error', output: error };
    }
  };
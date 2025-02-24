import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { addServicesService, getServicesService } from 'src/services/ServiceManagementService';
import { ApiResponse } from 'src/types/OnboardingApi';
import { GetServicesResponse } from 'src/types/ServiceManagementAPI';
import { CommonResponse } from 'src/types/UserManagementAPI';



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



  export const addServiceApi = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
    // debugg
    // console.log(data)
  
    try {
      const formData = new FormData();
      formData.append('featured_image', data.image);
      formData.append('service_id', data.service_id);
      formData.append('name', data.name);
      formData.append('description', data.description);
      // formData.append('state', data.state);
      // formData.append('email', data.email);
      // formData.append('password', data.password);
      // formData.append('password_confirmation', data.confirmPassword);
  
      
  
      const response = await addServicesService(encryptRequest(formData), config);
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
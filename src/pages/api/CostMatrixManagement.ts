import { AxiosResponse } from 'axios';
import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { addParentServicesService, deleteParentServiceService, getParentServicesServices, updateParentServiceService } from 'src/services/CostMatrixManagementService';
import { addServicesService, deleteServiceService, getServicesService, updateServiceService } from 'src/services/ServiceManagementService';
import { AddParentService, GetParentServicesResponse } from 'src/types/CostMatrixManagementService';
import { ApiConfig, ApiResponse } from 'src/types/OnboardingApi';
import { GetServicesResponse } from 'src/types/ServiceManagementAPI';
import { CommonResponse, GetCustomersResponse } from 'src/types/UserManagementAPI';



  export const getAllParentServices = async (config?: any): Promise<ApiResponse<GetParentServicesResponse>> => {

    try {
      const response = await getParentServicesServices(config);
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


  export const addService = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
    // debugg
    // console.log(data)
  
    try {
      const formData = new FormData();
      formData.append('parent_service', data.parent_service);
      formData.append('name', data.name);
  
      const response = await addParentServicesService(encryptRequest(formData), config);
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


  export const updateParentServiceApi = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
    // debugg
    // console.log(data)
  
    try {
      const formData = new FormData();
      // formData.append('service_id', data.service_id);
      formData.append('parent_service', data.parent_service);
      formData.append('name', data.name);   
      
      const userId = data.id
      
      const response = await updateParentServiceService(encryptRequest(formData),config,userId,);
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

  export const deleteParentServiceApi = async (userId: string, config?: any): Promise<ApiResponse<GetCustomersResponse>> => {

    try {
      const response = await deleteParentServiceService(userId, config);
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
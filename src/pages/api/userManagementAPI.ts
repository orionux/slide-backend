import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { addSubAdminService, deleteCustomerService, deleteSubAdminService, getCustomers, getSubAdmins, updateCustomerService, updateSubAdminService } from 'src/services/userManagementService';
import { ApiResponse } from 'src/types/OnboardingApi';
import { CommonResponse, GetCustomersResponse } from 'src/types/UserManagementAPI';


//customers(users)
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
export const updateCustomerApi = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  // debugg
  // console.log(data)

  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone_no', data.phone_no);
    formData.append('gender', data.gender);
    formData.append('state', data.state);
    formData.append('email', data.email);
    formData.append('company_name', data.company_name);
    formData.append('vat_number', data.vat_number);
    formData.append('billing_address', data.billing_address);
    formData.append('location', data.location);

    const userId = data.userId

    const response = await updateCustomerService(encryptRequest(formData), config, userId);
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

export const deleteCustomerApi = async (userId: string, config?: any): Promise<ApiResponse<GetCustomersResponse>> => {

  try {
    const response = await deleteCustomerService(userId, config);
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



//subAdmins 
export const getAllSubAdmins = async (config?: any): Promise<ApiResponse<GetCustomersResponse>> => {

  try {
    const response = await getSubAdmins(config);
    if (response?.data?.status === 'success') {
      return {
        responseType: 'success',
        output: decryptResponse(response.data),
      };
    } else {
 
    }
  } catch (error) {
    return { responseType: 'error', output: error };
  }
};

export const addSubAdminApi = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  // debugg
  // console.log(data)

  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone_no', data.phone);
    formData.append('gender', data.gender);
    formData.append('state', data.state);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.confirmPassword);

    

    const response = await addSubAdminService(encryptRequest(formData), config);
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

export const updateSubAdminApi = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  // debugg
  // console.log(data)

  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone_no', data.phone);
    formData.append('gender', data.gender);
    formData.append('state', data.state);
    formData.append('email', data.email);
    
    const userId = data.id
    console.log(userId);
    

    const response = await updateSubAdminService(encryptRequest(formData),config,userId,);
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

export const deleteSubAdminApi = async (userId: string, config?: any): Promise<ApiResponse<GetCustomersResponse>> => {

  try {
    const response = await deleteSubAdminService(userId, config);
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
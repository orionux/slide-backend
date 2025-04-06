import { decryptResponse, encryptRequest } from 'src/helpers/encryptData';
import { addAdminPictureService, addSubAdminService, deleteCustomerService, deleteSubAdminService, getAdminInfoService, getCustomers, getSubAdmins, updateAdminPasswordService, updateAdminService, updateCustomerService, updateSubAdminService } from 'src/services/userManagementService';
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
export const getAllSubAdmins = async (config?: any): Promise<ApiResponse<GetCustomersResponse> | undefined> => {

  try {
    const response = await getSubAdmins(config);
    if (response?.data?.status === 'success') {
      return {
        responseType: 'success',
        output: decryptResponse(response?.data),
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

//Admin(self)
export const getbAdminInfo = async (id: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  // debugg
  // console.log(data)

  try {
    
    const response = await getAdminInfoService(id,config);
    // console.log(response)
    if (response?.data?.status === 'success') {
      return {
        responseType: 'success',
        output: decryptResponse(response?.data?.data),
      };
    } else {
      return { responseType: 'fail', output: response.data };
    }
      //  return {
      //   responseType: 'success',
      //   output: decryptResponse(response.data),
      // };
  } catch (error) {
    return { responseType: 'error', output: error };
  }
};

export const updateAdminApi = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  // debugg
  // console.log(data)

  try {
    const formData = new FormData();
    formData.append('name', data.username);
    formData.append('mobile_no', data.phoneNumber);
    // formData.append('gender', data.gender);
    formData.append('status', data.status);
    formData.append('email', data.email);
    
    const userId = data.id
    

    const response = await updateAdminService(encryptRequest(formData),config,userId,);
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

export const updateAdminPassword = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  // debugg
  // console.log(data)

  try {
    const formData = new FormData();
    formData.append('current_password', data.currentPassword);
    formData.append('password', data.newPassword);
    formData.append('password_confirmation', data.confirmNewPassword);
    
    const userId = data.id
    

    const response = await updateAdminPasswordService(encryptRequest(formData),config,userId,);
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

// Updated to properly handle the Base64 string
export const addAdminPicture = async (data: any, config?: any): Promise<ApiResponse<CommonResponse>> => {
  try {
      const formData = new FormData();
      // Convert Base64 to Blob if needed
      const blob = dataURItoBlob(data.picture);
      formData.append('picture', blob);
      formData.append('id', data.id);

      const response = await addAdminPictureService(encryptRequest(formData), config, data.id);
      
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

// Helper function to convert Data URL to Blob
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeString });
}


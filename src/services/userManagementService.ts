import axios, { AxiosResponse } from 'axios'

import { ApiConfig } from 'src/types/OnboardingApi'
import { AddSubAdmin, CommonResponse, GetCustomersResponse, UpdateCustomer } from 'src/types/UserManagementAPI'

const apiURL = process.env.NEXT_PUBLIC_API_URL


//Customer (users)
export async function getCustomers(config?: ApiConfig): Promise<AxiosResponse<GetCustomersResponse>> {
  return await axios.get(apiURL + 'api/admin-customers', config)
}

export async function updateCustomerService(
  data: UpdateCustomer,
  config: ApiConfig,
  userId: string
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.post(apiURL + `api/admin-update-customer/${userId}`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}

export async function deleteCustomerService(
  userId: string,
  config: ApiConfig
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.delete(apiURL + `api/delete-customer/${userId}`, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}


//Subadmins
export async function getSubAdmins(config?: ApiConfig): Promise<AxiosResponse<GetCustomersResponse>> {
  return await axios.get(apiURL + 'api/admin-sub-admins', config)
}

export async function addSubAdminService(
  data: AddSubAdmin,
  config: ApiConfig,
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.post(apiURL + `api/admin-add-sub-admin`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}

export async function updateSubAdminService(
  data: UpdateCustomer,
  config: ApiConfig,
  userId: string
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.post(apiURL + `api/admin-update-sub-admin/${userId}`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}

export async function deleteSubAdminService(
  userId: string,
  config: ApiConfig
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.delete(apiURL + `api/delete-sub-admin/${userId}`, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}

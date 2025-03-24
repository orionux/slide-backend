import axios, { AxiosResponse } from "axios"
import { AddParentService, GetParentServicesResponse } from "src/types/CostMatrixManagementService"
import { ApiConfig, ApiResponse } from "src/types/OnboardingApi"
import { CommonResponse } from "src/types/UserManagementAPI"


const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function getParentServicesServices(config?: ApiConfig): Promise<ApiResponse<GetParentServicesResponse>> {
    return await axios.get(apiURL + 'api/get-services-with-price-cards', config)
  }
// export async function addServicesService(config?: ApiConfig): Promise<AxiosResponse<CommonResponse>> {
//     return await axios.post(apiURL + 'api/admin-add-service', config)
//   }

export async function addParentServicesService(
  data: AddParentService,
  config: ApiConfig,
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.post(apiURL + `api/admin-add-price-service`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}


export async function updateParentServiceService(
  data: AddParentService,
  config: ApiConfig,
  userId: string
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.post(apiURL + `api/admin-update-price-service/${userId}`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}


export async function deleteParentServiceService(
  userId: string,
  config: ApiConfig
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.delete(apiURL + `api/delete-price-service/${userId}`, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}
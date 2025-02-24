import axios, { AxiosResponse } from "axios"
import { ApiConfig } from "src/types/OnboardingApi"
import { AddService, GetServicesResponse } from "src/types/ServiceManagementAPI"
import { CommonResponse } from "src/types/UserManagementAPI"


const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function getServicesService(config?: ApiConfig): Promise<AxiosResponse<GetServicesResponse>> {
    return await axios.get(apiURL + 'api/admin-services', config)
  }
// export async function addServicesService(config?: ApiConfig): Promise<AxiosResponse<CommonResponse>> {
//     return await axios.post(apiURL + 'api/admin-add-service', config)
//   }

export async function addServicesService(
  data: AddService,
  config: ApiConfig,
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.post(apiURL + `api/admin-add-service`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}


export async function updateServiceService(
  data: AddService,
  config: ApiConfig,
  userId: string
): Promise<AxiosResponse<CommonResponse>> {
  return await axios.post(apiURL + `api/admin-update-service/${userId}`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers
    }
  })
}
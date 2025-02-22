import axios, { AxiosResponse } from "axios"
import { ApiConfig } from "src/types/OnboardingApi"
import { GetServicesResponse } from "src/types/ServiceManagementAPI"


const apiURL = process.env.NEXT_PUBLIC_API_URL

export async function getServicesService(config?: ApiConfig): Promise<AxiosResponse<GetServicesResponse>> {
    return await axios.get(apiURL + 'api/admin-services', config)
  }
import axios, { AxiosResponse } from 'axios'

import { ApiConfig } from 'src/types/OnboardingApi'
import { CommonResponse, GetCustomersResponse, UpdateCustomer } from 'src/types/UserManagementAPI'

const apiURL = process.env.NEXT_PUBLIC_API_URL

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

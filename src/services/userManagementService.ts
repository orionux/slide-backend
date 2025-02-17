import axios, { AxiosResponse } from 'axios';

import { ApiConfig } from "src/types/OnboardingApi";
import { GetCustomersResponse } from 'src/types/UserManagementAPI';

const apiURL =process.env.NEXT_PUBLIC_API_URL;


export async function getCustomers(config?: ApiConfig): Promise<AxiosResponse<GetCustomersResponse>> {
    return await axios.get(apiURL + 'api/admin-customers', config);
  }
interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    createdAt?: string;
    updatedAt?: string;
    isActive?: boolean;

}
export interface GetCustomersResponse {
    customers?: Customer[];
    total?: number;
    status?: string;
}

export interface CommonResponse {
    message: number;
    status: string;
}

export interface UpdateCustomer {
    name?: string;
    phone_no?: string;
    gender?: string;
    state?: string;
    company_name?: string;
    vat_number?: string;
    billing_address?: string;
    location?: string; 
}
export interface AddSubAdmin {
    name?: string;
    phone_no?: string;
    gender?: string;
    state?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}

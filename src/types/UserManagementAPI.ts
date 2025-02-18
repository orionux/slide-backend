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
    customers: Customer[];
    total: number;
    status: string;
    // Add other fields as needed
}
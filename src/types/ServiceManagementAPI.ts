interface Service {
    id: string;
    featured_image: string;
    name: string;
    description?: string;
}

export interface GetServicesResponse {
    customers?: Service[];
    total?: number;
    status?: string;
}
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

export interface AddService {
    service_id: string;
    featured_image?: File;
    name?: string;
    description?: string;
}
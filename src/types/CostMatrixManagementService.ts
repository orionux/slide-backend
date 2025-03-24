interface Service {
    id: Number;
    parent_service: string;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface GetParentServicesResponse {
    ParentServices?: Service[];
    total?: number;
    status?: string;
}

export interface AddParentService {
    parent_service: string;
    name: string;
}
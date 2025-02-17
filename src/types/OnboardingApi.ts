export interface ApiResponse<T> {
    responseType: 'success' | 'fail' | 'error';
    output: T | any;
  }
  
  // login req type
  export interface LoginUserRequest {
    email: string;
    password: string;
    // type: 'user' | 'sub admin' | 'admin';
  }
  export interface RegisterUserRequest {
    name: string;
    phone_no: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  // login res type
  export interface LoginUserResponse {
    status: string;
    message: string;
    data: {
      token: string;
      user: {
        id: number;
        email: string;
        email_verified_at: string | null;
        role: string;
        status: string;
        created_at: string | null;
        updated_at: string;
        deleted_at: string | null;
        user_details: {
          id: number;
          user_id: number;
          name: string;
          mobile_no: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
      };
    };
  }
  export interface RegisterUserResponse {
    status: string;
    message: string;
  }
  
  export interface ApiConfig {
    headers?: Record<string, string>;
    //more
  }

  
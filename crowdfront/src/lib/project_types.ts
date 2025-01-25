// Common Types
interface BaseResponse {
    status: boolean | 'success' | 'error';
    code?: string;
    data: any | null;
    message?: string;
    error?: string | { message: string; details: Record<string, string[]> };
  }
  
  // Project Type
  interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
    detailed_description: string;
    created_at: string;
    updated_at: string;
    owner: string;
    owner_id: number;
  }
  
  // List Projects
  interface ProjectListResponse extends BaseResponse {
    data: {
      count: number;
      next: string | null;
      previous: string | null;
      results: Project[];
    };
  }
  
  // Create Project
  interface CreateProjectRequest {
    title: string;
    description: string;
    detailed_description?: string;
    image?: File;
  }
  
  interface CreateProjectResponse extends BaseResponse {
    data: Project;
  }
  
  // Project Detail
  interface ProjectDetailResponse extends BaseResponse {
    data: Project;
  }
  
  // Update Project
  interface UpdateProjectRequest {
    title?: string;
    description?: string;
    detailed_description?: string;
    image?: File;
  }
  
  interface UpdateProjectResponse extends BaseResponse {
    data: Project;
  }
  
  // Delete Project
  interface DeleteProjectResponse extends BaseResponse {
    data: {
      message: string;
    };
  }
  
  // API Error Response
  interface ApiErrorResponse extends BaseResponse {
    error: string | {
      message: string;
      details: Record<string, string[]>;
    };
  }
  
  export type {
    Project,
    BaseResponse,
    ProjectListResponse,
    CreateProjectRequest,
    CreateProjectResponse,
    ProjectDetailResponse,
    UpdateProjectRequest,
    UpdateProjectResponse,
    DeleteProjectResponse,
    ApiErrorResponse
  };
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';
import API_ENDPOINTS from '../api/endpoints';
import { 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest,
  ProjectListResponse,
  ProjectDetailResponse,
  CreateProjectResponse,
  UpdateProjectResponse
} from '../lib/project_types';
import { RootState } from '../store/store';

interface ProjectState {
  projects: Project[];
  ownprojects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  actionLoading: {
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
  lookingForOptions: any[];
}

const initialState: ProjectState = {
  projects: [],
  ownprojects: [],
  currentProject: null,
  loading: false,
  error: null,
  actionLoading: {
    create: false,
    update: false,
    delete: false,
  },
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
  lookingForOptions: [],
};

// Add this interface for pagination parameters
interface FetchProjectsParams {
  page?: number;
  pageSize?: number;
}

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params: FetchProjectsParams = {}, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('page_size', params.pageSize.toString());
      
      const response = await api.get<ProjectListResponse>(
        `${API_ENDPOINTS.projects.list}?${queryParams.toString()}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to fetch projects");
    }
  }
);
export const fetchOwnProjects = createAsyncThunk(
  'projects/fetchOwnProjects',
  async (params: FetchProjectsParams = {}, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.pageSize) queryParams.append('page_size', params.pageSize.toString());
      
      const response = await api.get<ProjectListResponse>(
        `${API_ENDPOINTS.projects.ownlist}?${queryParams.toString()}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to fetch projects");
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id: number, thunkAPI) => {
    try {
      const response = await api.get<ProjectDetailResponse>(API_ENDPOINTS.projects.detail(id));
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to fetch project");
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (data: CreateProjectRequest, thunkAPI) => {
    try {
      // const formData = new FormData();
      // Object.entries(data).forEach(([key, value]) => {
      //   if (value !== undefined) {
      //     formData.append(key, value);
      //   }
      // });
      const response = await api.post<CreateProjectResponse>(API_ENDPOINTS.projects.create, data);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data || "Failed to create project");
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: number; data: UpdateProjectRequest }, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await api.patch<UpdateProjectResponse>(API_ENDPOINTS.projects.update(id), formData);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to update project");
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: number, thunkAPI) => {
    try {
      await api.delete(API_ENDPOINTS.projects.delete(id));
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to delete project");
    }
  }
);

// New action to fetch looking for options
export const fetchLookingForOptions = createAsyncThunk(
  'projects/fetchLookingForOptions',
  async (query: string) => {
    console.log("Fetching options for query:", query);
    const response = await api.get(`${API_ENDPOINTS.positions.search}?q=${query}`);
    
    if (!response || !response.data) {
      throw new Error('Failed to fetch looking for options');
    }
    
    console.log("Response data:", response.data);
    // Map the response to the expected format
    return response.data.data.map((item: { id: number; position: string }) => ({
      value: item.id.toString(), // Ensure value is a string
      label: item.position,
    })) || [];
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data.results;
        state.pagination = {
          count: action.payload.data.count,
          next: action.payload.data.next,
          previous: action.payload.data.previous,
        };
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
        // Fetch own projects
        .addCase(fetchOwnProjects.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchOwnProjects.fulfilled, (state, action) => {
          state.loading = false;
          state.ownprojects = action.payload.data.results;
          state.pagination = {
            count: action.payload.data.count,
            next: action.payload.data.next,
            previous: action.payload.data.previous,
          };
        })
        .addCase(fetchOwnProjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
      // Fetch single project
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create project
      .addCase(createProject.pending, (state) => {
        state.actionLoading.create = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.actionLoading.create = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.actionLoading.create = false;
        state.error = action.payload as string;
      })
      // Update project
      .addCase(updateProject.pending, (state) => {
        state.actionLoading.update = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.actionLoading.update = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.actionLoading.update = false;
        state.error = action.payload as string;
      })
      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.actionLoading.delete = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.actionLoading.delete = false;
        state.projects = state.projects.filter(p => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.actionLoading.delete = false;
        state.error = action.payload as string;
      })
      // Fetch looking for options
      .addCase(fetchLookingForOptions.fulfilled, (state, action) => {
        console.log("Fetched looking for options:", action.payload);
        state.lookingForOptions = action.payload;
      });
  },
});

// Export actions
export const { clearCurrentProject, clearError } = projectSlice.actions;

// Export reducer
export default projectSlice.reducer;

// Export selectors
export const selectPaginationInfo = (state: RootState) => state.projects.pagination;
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectsLoading = (state: RootState) => state.projects.loading; 
export const selectOwnProjects = (state: RootState) => state.projects.ownprojects;
export const selectOwnProjectsLoading = (state: RootState) => state.projects.loading;
export const selectCurrentProject = (state: RootState) => state.projects.currentProject;
export const selectProjectsError = (state: RootState) => state.projects.error;
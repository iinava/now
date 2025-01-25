const API_ENDPOINTS = {
  auth: {
    register: '/api/auth/register/',
    login: '/api/auth/token/',
    refresh: '/api/auth/token/refresh/',
    logout: '/api/auth/logout/',
    update: '/api/auth/update/',
    profile: '/api/auth/profile/',
  },
  projects: {
    list: '/api/projects/',
    ownlist:'/api/projects/my-projects/',
    create: '/api/projects/create/',
    detail: (id: string | number) => `/api/projects/${id}/`,
    update: (id: string | number) => `/api/projects/${id}/update/`,
    delete: (id: string | number) => `/api/projects/${id}/delete/`,
  },
  chats: {
    list: '/api/chats/',
    create: '/api/chats/create/',
    messages: {
      list: (chatId: string | number) => `/api/chats/${chatId}/messages/`,
      create: (chatId: string | number) => `/api/chats/${chatId}/messages/create/`,
    },
  },
};

export default API_ENDPOINTS; 
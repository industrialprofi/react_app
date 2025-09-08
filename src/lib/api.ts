import config from './config';

export const API_BASE_URL = config.API_BASE_URL;

// Helper functions for auth token management
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);};

export const clearAuthToken = () => {
  localStorage.removeItem('auth_token');};

// API client with common fetch wrapper
export const api = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  },

  post: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  delete: async <T = void>(url: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  },
};

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
      
      // Clear auth token on 401 Unauthorized
      if (response.status === 401) {
        clearAuthToken();
      }
    } catch (e) {
      // If response is not JSON, use status text
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  // For 204 No Content responses
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  // Try to parse JSON, fall back to text if not JSON
  try {
    return await response.json();
  } catch (e) {
    return (await response.text()) as unknown as T;
  }
}


// Типы для API
interface Conversation {
  id: number;
  title?: string;
  created_at: string;
  messages: Message[];
}

interface Message {
  id: number;
  sender_type: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

interface ChatRequest {
  message: string;
  conversation_id?: number;
}

interface ChatResponse {
  message_id: number;
  response: string;
  conversation_id?: number;
}

// Вспомогательная функция для получения заголовков с токеном
export const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

// API для чата
export const chatApi = {
  // Отправка сообщения и получение ответа
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await fetch(`${config.API_BASE_URL}/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка отправки сообщения');
    }

    return response.json();
  },

  // Потоковая отправка сообщения (для будущей реализации)
  sendMessageStream: async (request: ChatRequest): Promise<Response> => {
    const response = await fetch(`${config.API_BASE_URL}/chat/stream`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка потоковой отправки');
    }

    return response;
  },
};

// API для разговоров
export const conversationsApi = {
  // Получение списка разговоров
  getConversations: async (): Promise<Conversation[]> => {
    const response = await fetch(`${config.API_BASE_URL}/conversations`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка загрузки разговоров');
    }

    return response.json();
  },

  // Создание нового разговора
  createConversation: async (title: string): Promise<Conversation> => {
    const response = await fetch(`${config.API_BASE_URL}/conversations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка создания разговора');
    }

    return response.json();
  },

  // Получение конкретного разговора
  getConversation: async (id: number): Promise<Conversation> => {
    const response = await fetch(`${config.API_BASE_URL}/conversations/${id}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка загрузки разговора');
    }

    return response.json();
  },

  // Обновление разговора
  updateConversation: async (id: number, title: string): Promise<Conversation> => {
    const response = await fetch(`${config.API_BASE_URL}/conversations/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка обновления разговора');
    }

    return response.json();
  },

  // Удаление разговора
  deleteConversation: async (id: number): Promise<void> => {
    const response = await fetch(`${config.API_BASE_URL}/conversations/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка удаления разговора');
    }
  },

  // Добавление сообщения в разговор (для сохранения контента документа)
  addMessageToConversation: async (id: number, content: string): Promise<{ message: string; message_id: number }> => {
    const response = await fetch(`${config.API_BASE_URL}/conversations/${id}/messages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка сохранения контента');
    }

    return response.json();
  },
};

// API для аутентификации
export const authApi = {
  // Login with email and password
  login: async (email: string, password: string) => {
    return api.post<{ access_token: string; user: any }>('/auth/login', { email, password });
  },
  
  // Get current user
  getMe: async () => {
    return api.get<any>('/users/me');
  },
  
  // Original auth functions
  // Верификация email
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await fetch(`${config.API_BASE_URL}/auth/verify-email?token=${token}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка верификации email');
    }

    return response.json();
  },

  // Повторная отправка верификационного email
  resendVerification: async (email: string): Promise<{ message: string }> => {
    const response = await fetch(`${config.API_BASE_URL}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Ошибка отправки email');
    }

    return response.json();
  },

  // OAuth вход (для будущей реализации)
  oauthLogin: async (provider: 'google' | 'github'): Promise<void> => {
    window.location.href = `${config.API_BASE_URL}/auth/login/${provider}`;
  },
};
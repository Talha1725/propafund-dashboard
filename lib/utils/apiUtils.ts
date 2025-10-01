export function handleApiError(error: unknown): string {
  if (error && typeof error === 'object') {
    // Check if it's an axios error
    if ('response' in error && error.response && typeof error.response === 'object') {
      const response = error.response as { data?: { message?: string; error?: string }; statusText?: string };
      
      // Check for data.message
      if (response.data && typeof response.data === 'object' && 'message' in response.data) {
        return String(response.data.message);
      }
      
      // Check for data.error
      if (response.data && typeof response.data === 'object' && 'error' in response.data) {
        return String(response.data.error);
      }
      
      // Check for status text
      if ('statusText' in response && typeof response.statusText === 'string') {
        return response.statusText;
      }
    }
    
    // Check if it's a standard Error object
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
  }
  
  // Fallback error message
  return "An unexpected error occurred. Please try again.";
}

export function getAuthHeaders(token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem('userData');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
}

class ContactService {
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}/contact${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async submitContactForm(data: ContactFormData): Promise<{ message: string; id: string }> {
    return this.makeRequest<{ message: string; id: string }>('', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return this.makeRequest<ContactSubmission[]>('');
  }

  async getContactSubmission(id: string): Promise<ContactSubmission> {
    return this.makeRequest<ContactSubmission>(`/${id}`);
  }

  async updateContactStatus(id: string, status: string): Promise<ContactSubmission> {
    return this.makeRequest<ContactSubmission>(`/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

export const contactService = new ContactService(); 
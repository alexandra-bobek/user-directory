import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { fetchUsers } from '../../services/api';
import type { User } from '../../types';

// Mock the API module
vi.mock('../../services/api', () => ({
  fetchUsers: vi.fn(),
}));

// Mock data for testing
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'New York',
      zipcode: '10001',
      geo: {
        lat: '40.7128',
        lng: '-74.0060'
      }
    },
    phone: '123-456-7890',
    website: 'example.com',
    company: {
      name: 'Example Inc',
      catchPhrase: 'Making examples since 2023',
      bs: 'innovative examples'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    address: {
      street: 'Broadway',
      suite: 'Suite 200',
      city: 'New York',
      zipcode: '10002',
      geo: {
        lat: '40.7128',
        lng: '-74.0060'
      }
    },
    phone: '098-765-4321',
    website: 'janesmith.com',
    company: {
      name: 'Smith Co',
      catchPhrase: 'Quality is our priority',
      bs: 'customer-focused solutions'
    }
  }
];

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should show loading state initially', () => {
    // Mock the fetchUsers function to return a promise that never resolves
    vi.mocked(fetchUsers).mockImplementation(() => new Promise(() => {}));
    
    render(<App />);
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('should show error state when API call fails', async () => {
    // Mock the fetchUsers function to reject with an error
    vi.mocked(fetchUsers).mockRejectedValueOnce(new Error('API Error'));
    
    render(<App />);
    
    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch users. Please try again later.')).toBeInTheDocument();
    });
  });

  it('should show users when API call succeeds', async () => {
    // Mock the fetchUsers function to resolve with mock users
    vi.mocked(fetchUsers).mockResolvedValueOnce(mockUsers);
    
    render(<App />);
    
    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('should open user detail modal when a user is clicked', async () => {
    // Mock the fetchUsers function to resolve with mock users
    vi.mocked(fetchUsers).mockResolvedValueOnce(mockUsers);
    
    render(<App />);
    
    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    // Click on a user
    const user = userEvent.setup();
    await user.click(screen.getByText('John Doe'));
    
    // Check if the user detail modal is displayed
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
  });

  it('should close user detail modal when close button is clicked', async () => {
    // Mock the fetchUsers function to resolve with mock users
    vi.mocked(fetchUsers).mockResolvedValueOnce(mockUsers);
    
    render(<App />);
    
    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    // Click on a user
    const user = userEvent.setup();
    await user.click(screen.getByText('John Doe'));
    
    // Check if the user detail modal is displayed
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    
    // Click the close button
    await user.click(screen.getByRole('button', { name: '×' }));
    
    // Check if the user detail modal is closed
    await waitFor(() => {
      expect(screen.queryByText('@johndoe')).not.toBeInTheDocument();
    });
  });

  it('should delete a user when delete button is clicked', async () => {
    // Mock the fetchUsers function to resolve with mock users
    vi.mocked(fetchUsers).mockResolvedValueOnce(mockUsers);
    
    render(<App />);
    
    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
    
    // Click the delete button for the first user
    const user = userEvent.setup();
    const deleteButtons = screen.getAllByText('✕');
    await user.click(deleteButtons[0]);
    
    // Check if the user is deleted
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });
});
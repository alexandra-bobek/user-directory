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

describe('User Flow Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock the fetchUsers function to resolve with mock users
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);
  });

  it('should allow viewing and closing user details', async () => {
    render(<App />);

    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Click on a user to view details
    const user = userEvent.setup();
    await user.click(screen.getByText('John Doe'));

    // Check if the user detail modal is displayed
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();

    // Close the modal by clicking the close button
    await user.click(screen.getByRole('button', { name: '×' }));

    // Check if the modal is closed
    await waitFor(() => {
      expect(screen.queryByText('@johndoe')).not.toBeInTheDocument();
    });

    // Click on another user to view details
    await user.click(screen.getByText('Jane Smith'));

    // Check if the user detail modal is displayed with the correct user
    expect(screen.getByText('@janesmith')).toBeInTheDocument();

    // Close the modal by clicking outside (on the overlay)
    const overlay = screen.getByRole('dialog').parentElement;
    await user.click(overlay!);

    // Check if the modal is closed
    await waitFor(() => {
      expect(screen.queryByText('@janesmith')).not.toBeInTheDocument();
    });
  });

  it('should allow deleting users', async () => {
    render(<App />);

    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Delete the first user
    const user = userEvent.setup();
    const deleteButtons = screen.getAllByText('✕');
    await user.click(deleteButtons[0]);

    // Check if the user is deleted
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // Delete the second user
    await user.click(screen.getByText('✕'));

    // Check if the second user is deleted
    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    // Check if there are no users left
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('should handle the complete user flow', async () => {
    render(<App />);

    // Wait for the users to be displayed
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    const user = userEvent.setup();

    // View details of the first user
    await user.click(screen.getByText('John Doe'));
    expect(screen.getByText('@johndoe')).toBeInTheDocument();

    // Close the modal
    await user.click(screen.getByRole('button', { name: '×' }));
    await waitFor(() => {
      expect(screen.queryByText('@johndoe')).not.toBeInTheDocument();
    });

    // Delete the first user
    const deleteButtons = screen.getAllByText('✕');
    await user.click(deleteButtons[0]);

    // Check if the first user is deleted
    await waitFor(() => {
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    // View details of the second user
    await user.click(screen.getByText('Jane Smith'));
    expect(screen.getByText('@janesmith')).toBeInTheDocument();

    // Delete the second user while the modal is open
    await user.click(screen.getByRole('button', { name: '×' }));
    await waitFor(() => {
      expect(screen.queryByText('@janesmith')).not.toBeInTheDocument();
    });

    await user.click(screen.getByText('✕'));

    // Check if the second user is deleted
    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });
});

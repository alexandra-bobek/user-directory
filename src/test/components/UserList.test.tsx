import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserList from '../../components/UserList';
import type { User } from '../../types';

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

describe('UserList Component', () => {
  it('should render users correctly', () => {
    render(
      <UserList 
        users={mockUsers} 
        onUserClick={vi.fn()} 
        onDeleteUser={vi.fn()} 
      />
    );
    
    // Check if user information is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Main St, Apt 1')).toBeInTheDocument();
    expect(screen.getByText('New York, 10001')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('example.com')).toBeInTheDocument();
    expect(screen.getByText('Example Inc')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('should render empty state when no users are provided', () => {
    render(
      <UserList 
        users={[]} 
        onUserClick={vi.fn()} 
        onDeleteUser={vi.fn()} 
      />
    );
    
    // Check if table headers are displayed but no user data
    expect(screen.getByText('NAME/EMAIL')).toBeInTheDocument();
    expect(screen.getByText('ADDRESS')).toBeInTheDocument();
    expect(screen.getByText('PHONE')).toBeInTheDocument();
    expect(screen.getByText('WEBSITE')).toBeInTheDocument();
    expect(screen.getByText('COMPANY')).toBeInTheDocument();
    expect(screen.getByText('ACTION')).toBeInTheDocument();
    
    // Check that no user data is displayed
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('jane@example.com')).not.toBeInTheDocument();
  });

  it('should call onUserClick when a user row is clicked', async () => {
    const onUserClickMock = vi.fn();
    
    render(
      <UserList 
        users={mockUsers} 
        onUserClick={onUserClickMock} 
        onDeleteUser={vi.fn()} 
      />
    );
    
    // Click on the first user row
    const user = userEvent.setup();
    await user.click(screen.getByText('John Doe'));
    
    // Check if onUserClick was called with the correct user
    expect(onUserClickMock).toHaveBeenCalledTimes(1);
    expect(onUserClickMock).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('should call onDeleteUser when the delete icon is clicked', async () => {
    const onDeleteUserMock = vi.fn();
    
    render(
      <UserList 
        users={mockUsers} 
        onUserClick={vi.fn()} 
        onDeleteUser={onDeleteUserMock} 
      />
    );
    
    // Click on the delete icon for the first user
    const user = userEvent.setup();
    const deleteButtons = screen.getAllByText('✕');
    await user.click(deleteButtons[0]);
    
    // Check if onDeleteUser was called with the correct user ID
    expect(onDeleteUserMock).toHaveBeenCalledTimes(1);
    expect(onDeleteUserMock).toHaveBeenCalledWith(mockUsers[0].id);
  });

  it('should not call onUserClick when delete icon is clicked', async () => {
    const onUserClickMock = vi.fn();
    const onDeleteUserMock = vi.fn();
    
    render(
      <UserList 
        users={mockUsers} 
        onUserClick={onUserClickMock} 
        onDeleteUser={onDeleteUserMock} 
      />
    );
    
    // Click on the delete icon for the first user
    const user = userEvent.setup();
    const deleteButtons = screen.getAllByText('✕');
    await user.click(deleteButtons[0]);
    
    // Check if onDeleteUser was called but onUserClick was not
    expect(onDeleteUserMock).toHaveBeenCalledTimes(1);
    expect(onUserClickMock).not.toHaveBeenCalled();
  });
});
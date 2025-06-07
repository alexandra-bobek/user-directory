import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserDetail from '../../components/UserDetail';
import type { User } from '../../types';

// Mock user data for testing
const mockUser: User = {
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
};

describe('UserDetail Component', () => {
  it('should render user details correctly', () => {
    render(<UserDetail user={mockUser} onClose={vi.fn()} />);

    // Check if user information is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('example.com')).toBeInTheDocument();

    // Check address information
    expect(screen.getByText('Main St')).toBeInTheDocument();
    expect(screen.getByText('Apt 1')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('10001')).toBeInTheDocument();

    // Check company information
    expect(screen.getByText('Example Inc')).toBeInTheDocument();
    expect(screen.getByText('Making examples since 2023')).toBeInTheDocument();
    expect(screen.getByText('innovative examples')).toBeInTheDocument();

    // Check if map link is displayed
    expect(screen.getByText(/View on Map/)).toBeInTheDocument();
    const mapLink = screen.getByText(/View on Map/).closest('a');
    expect(mapLink).toHaveAttribute('href', 'https://www.google.com/maps?q=40.7128,-74.0060');
  });

  it('should call onClose when the overlay is clicked', async () => {
    const onCloseMock = vi.fn();
    render(<UserDetail user={mockUser} onClose={onCloseMock} />);

    // Click on the overlay (the parent div with modalOverlay class)
    const user = userEvent.setup();
    const overlay = screen.getByRole('dialog').parentElement;
    await user.click(overlay!);

    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when the close button is clicked', async () => {
    const onCloseMock = vi.fn();
    render(<UserDetail user={mockUser} onClose={onCloseMock} />);

    // Click on the close button
    const user = userEvent.setup();
    const closeButton = screen.getByRole('button', { name: '×' });
    await user.click(closeButton);

    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when the modal content is clicked', async () => {
    const onCloseMock = vi.fn();
    render(<UserDetail user={mockUser} onClose={onCloseMock} />);

    // Click on the modal content
    const user = userEvent.setup();
    const modalContent = screen.getByText('John Doe').closest('.modalContent');
    await user.click(modalContent!);

    // Check if onClose was not called
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('should have correct links for website and map', () => {
    render(<UserDetail user={mockUser} onClose={vi.fn()} />);

    // Check website link
    const websiteLink = screen.getByText('example.com').closest('a');
    expect(websiteLink).toHaveAttribute('href', 'https://example.com');
    expect(websiteLink).toHaveAttribute('target', '_blank');
    expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Check map link
    const mapLink = screen.getByText(/View on Map/).closest('a');
    expect(mapLink).toHaveAttribute('href', 'https://www.google.com/maps?q=40.7128,-74.0060');
    expect(mapLink).toHaveAttribute('target', '_blank');
    expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

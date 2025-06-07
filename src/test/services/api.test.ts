import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUsers } from '../../services/api';
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
  }
];

describe('API Service', () => {
  // Setup and teardown
  beforeEach(() => {
    // Clear all mocks before each test
    vi.resetAllMocks();
  });

  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  it('should fetch users successfully', async () => {
    // Mock the fetch function
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockUsers)
    });

    // Call the function
    const result = await fetchUsers();

    // Assertions
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    expect(result).toEqual(mockUsers);
  });

  it('should throw an error when fetch fails', async () => {
    // Mock the fetch function to simulate a failed request
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    });

    // Assertions
    await expect(fetchUsers()).rejects.toThrow('HTTP error! Status: 404');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when fetch throws', async () => {
    // Mock the fetch function to throw an error
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    // Assertions
    await expect(fetchUsers()).rejects.toThrow('Network error');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
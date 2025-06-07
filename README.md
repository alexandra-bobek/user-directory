# User Directory Application

A modern React application for viewing and managing user information. This application fetches user data from the JSONPlaceholder API and provides a clean interface for browsing user details.

## Features

- **User List View**: Display all users in a tabular format with key information
- **Detailed User View**: Click on any user to view comprehensive details
- **User Deletion**: Remove users from the directory
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error handling for API failures
- **Loading States**: Visual feedback during data loading

## Technologies Used

- **React 19**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Vite**: For fast development and optimized builds
- **CSS Modules**: For component-scoped styling
- **JSONPlaceholder API**: For fetching mock user data

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-directory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

## Usage

After starting the development server, open your browser to the URL displayed in the terminal (typically http://localhost:5173 or similar). The application will load and display a list of users.

- **View User Details**: Click on any user row to open a modal with detailed information
- **Delete User**: Click the "Delete" button in the user row to remove the user from the list
- **Close User Details**: Click the "×" button or click outside the modal to close the user details view

## API Documentation

The application uses the JSONPlaceholder API to fetch user data:

- **Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Method**: GET
- **Response**: Array of user objects with the following structure:
  ```typescript
  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      }
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    }
  }
  ```

## Component Structure

- **App**: Main application component that manages state and renders child components
- **UserList**: Displays users in a tabular format with options to view details or delete
- **UserDetail**: Modal component that displays detailed information about a selected user

## Error Handling

The application includes error handling for API failures. If the API request fails, an error message is displayed to the user, and the error is logged to the console.

## Loading States

During API requests, a loading indicator is displayed to provide visual feedback to the user.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
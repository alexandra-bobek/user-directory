import { useState, useEffect } from 'react';
import type { User } from './types';
import { fetchUsers } from './services/api';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import styles from './styles/App.module.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Users</h1>
      </header>

      {loading && (
        <div className={styles.loading}>Loading users...</div>
      )}

      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {!loading && !error && (
        <UserList 
          users={users} 
          onUserClick={handleUserClick} 
          onDeleteUser={handleDeleteUser} 
        />
      )}

      {selectedUser && (
        <UserDetail 
          user={selectedUser} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;

import React from 'react';
import type { User } from '../types.ts';
import styles from '../styles/UserList.module.css';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
  onDeleteUser: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick, onDeleteUser }) => {
  const handleDeleteClick = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation(); // Prevent triggering the row click
    onDeleteUser(userId);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name / Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => onUserClick(user)}>
              <td>
                <div><strong>{user.name}</strong></div>
                <div>{user.email}</div>
              </td>
              <td>
                {user.address.street}, {user.address.suite}<br />
                {user.address.city}, {user.address.zipcode}
              </td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
              <td>
                <button 
                  className={styles.deleteButton}
                  onClick={(e) => handleDeleteClick(e, user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

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
            <th>NAME/EMAIL</th>
            <th>ADDRESS</th>
            <th>PHONE</th>
            <th>WEBSITE</th>
            <th>COMPANY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => onUserClick(user)}>
              <td>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userEmail}>{user.email}</div>
              </td>
              <td className={styles.userAddress}>
                <div className={styles.userAddressLine}>{user.address.street}, {user.address.suite}</div>
                <div className={styles.userAddressLine}>{user.address.city}, {user.address.zipcode}</div>
              </td>
              <td>{user.phone}</td>
              <td>
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className={styles.userWebsite}>
                  {user.website}
                </a>
              </td>
              <td>{user.company.name}</td>
              <td>
                <span 
                  className={styles.deleteIcon}
                  onClick={(e) => handleDeleteClick(e, user.id)}
                >
                  ✕
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

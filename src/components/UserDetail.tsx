import React from 'react';
import type { User } from '../types.ts';
import styles from '../styles/UserDetail.module.css';

interface UserDetailProps {
  user: User;
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
  // Create Google Maps URL using the geo coordinates
  const mapUrl = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        <div className={styles.userDetailHeader}>
          <h2>{user.name}</h2>
          <div>@{user.username}</div>
        </div>

        <div className={styles.userDetailSection}>
          <h3>Contact Information</h3>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Email:</div>
            <div className={styles.userDetailValue}>{user.email}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Phone:</div>
            <div className={styles.userDetailValue}>{user.phone}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Website:</div>
            <div className={styles.userDetailValue}>
              <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.userDetailSection}>
          <h3>Address</h3>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Street:</div>
            <div className={styles.userDetailValue}>{user.address.street}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Suite:</div>
            <div className={styles.userDetailValue}>{user.address.suite}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>City:</div>
            <div className={styles.userDetailValue}>{user.address.city}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Zipcode:</div>
            <div className={styles.userDetailValue}>{user.address.zipcode}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Location:</div>
            <div className={styles.userDetailValue}>
              <a 
                href={mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                View on Map ({user.address.geo.lat}, {user.address.geo.lng})
              </a>
            </div>
          </div>
        </div>

        <div className={styles.userDetailSection}>
          <h3>Company</h3>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Name:</div>
            <div className={styles.userDetailValue}>{user.company.name}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>Catch Phrase:</div>
            <div className={styles.userDetailValue}>{user.company.catchPhrase}</div>
          </div>
          <div className={styles.userDetailItem}>
            <div className={styles.userDetailLabel}>BS:</div>
            <div className={styles.userDetailValue}>{user.company.bs}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

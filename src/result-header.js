import React from 'react';
import styles from './srheader.module.css';

function ResultHeader() {
  return (
    <div className={styles.resultHeader}>
      <div className={styles.logo}>RentEase</div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search 'Farm house in Pondicherry below 1 cr'"
          className={styles.searchInput}
        />
        <button className={styles.searchBtn}>Search</button>
      </div>
    </div>
  );
}

export default ResultHeader;

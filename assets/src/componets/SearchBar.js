import React from 'react';
import styles from './SearchBar.module.css';

class SearchBar extends React.Component {
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.search}>
                    <input className={styles.searchTerm} type='text' placeholder='Search term'/>
                    <input className={styles.searchButton} type='submit' value="Search"/>
                </div>
            </div>
        )
    }
}

export default SearchBar    ;
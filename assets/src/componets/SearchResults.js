import React from 'react';

import styles from './SearchResults.module.css';

import { Link } from 'react-router-dom'

class SearchResults extends React.Component {
    render() {
        let results = this.props.results.map((item) => {
            return (
                <div className={styles.result}>
                    <div className={styles.resultImage}></div>
                    <div className={styles.resultTitle}>
                        <Link to={'/items/' + item.id}>{item.title}</Link>  
                    </div>
                </div>
            )
        })
        return (
            <div className={styles.resultsContainer}>
                {results}
            </div>
        )
    }
}

export default SearchResults;